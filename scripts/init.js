const db = require("@arangodb").db;
const gm = require("@arangodb/general-graph");

["alunos", "disciplinas"].forEach(n => { if (!db._collection(n)) db._create(n); });
["amizades", "matriculas"].forEach(n => { if (!db._collection(n)) db._createEdgeCollection(n); });

if (!gm._exists("rede_academica")) {
  gm._create("rede_academica", [
    gm._relation("amizades", ["alunos"], ["alunos"]),
    gm._relation("matriculas", ["alunos"], ["disciplinas"])
  ]);
}

const alunos = [
  ["Ana Souza","SI",3],["Bruno Lima","ADS",2],["Carla Mendes","CC",5],["Diego Alves","SI",3],
  ["Elisa Rocha","ADS",4],["Felipe Costa","CC",1],["Gabriela Nunes","SI",6],["Hugo Martins","ADS",2],
  ["Isabela Dias","CC",4],["João Pereira","SI",5],["Karina Freitas","ADS",3],["Lucas Ribeiro","CC",2],
  ["Marina Teixeira","SI",1],["Nicolas Barros","ADS",6],["Olivia Cardoso","CC",3],["Pedro Gomes","SI",4],
  ["Quésia Moura","ADS",5],["Rafael Araújo","CC",6],["Sofia Campos","SI",2],["Thiago Pinto","ADS",1],
  ["Ursula Faria","CC",4],["Vitor Machado","SI",3],["Wesley Cunha","ADS",5],["Yasmin Lopes","CC",2]
];
const disciplinas = [
  ["Bancos de Dados NoSQL","Prof. Marcos"],["Algoritmos","Profa. Helena"],["Redes de Computadores","Prof. Renato"],
  ["Engenharia de Software","Profa. Clara"],["Inteligência Artificial","Prof. Otávio"],["Estruturas de Dados","Prof. Sérgio"]
];
const k = i => "a" + String(i + 1).padStart(2, "0");

alunos.forEach((a, i) => db.alunos.insert({ _key: k(i), nome: a[0], curso: a[1], semestre: a[2] }));
disciplinas.forEach((d, i) => db.disciplinas.insert({ _key: "d" + (i + 1), nome: d[0], professor: d[1] }));

const pares = [[0,1],[0,3],[0,12],[1,2],[1,4],[2,5],[2,8],[3,6],[3,9],[4,7],[4,10],[5,11],
  [6,9],[6,13],[7,10],[8,11],[8,14],[9,15],[10,16],[11,17],[12,18],[13,15],[14,17],[15,19],
  [16,20],[17,21],[18,19],[19,22],[20,23],[21,23],[22,23],[5,14],[2,17],[0,18],[7,16],[13,22]];
pares.forEach(([x, y]) => db.amizades.insert({ _from: "alunos/" + k(x), _to: "alunos/" + k(y), desde: "2024-0" + (1 + (x + y) % 9) + "-15" }));

alunos.forEach((a, i) => {
  const ds = new Set([i % 6, (i + 1) % 6]);
  if (i % 2 === 0) ds.add((i + 3) % 6);
  ds.forEach(d => db.matriculas.insert({ _from: "alunos/" + k(i), _to: "disciplinas/d" + (d + 1), semestre: "2026.2" }));
});

print("Carga concluída.");