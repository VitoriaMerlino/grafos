# Projeto Rede Social Acadêmica - Banco de Dados NoSQL (ArangoDB) - Vitória Merlino, Paulo Cesar, Filipe Hannisch

Este repositório contém a implementação de uma rede social acadêmica para mapeamento de conexões entre **Alunos**, **Disciplinas** e relacionamentos de **Amizade**, com suporte a recomendações de "amigos de amigos" e análise de grafos.

---

## 🥑 Justificativa da Escolha do Banco

A escolha do **ArangoDB** deu-se por dois grandes motivos:

1. **O Mascote (Avocado):** Impossível ignorar o apelo visual e a simpatia de um banco de dados representado por um abacate. 🥑
2. **Arquitetura Multi-modelo Nativa:** Tecnicamente, o ArangoDB oferece suporte completo a **Grafos** e **Documentos (JSON)** em uma única engine. Diferente de bancos de grafos mais rígidos, ele utiliza a **AQL (ArangoDB Query Language)**, que é extremamente flexível e declarativa. A divisão intuitiva entre *Document Collections* (nós) e *Edge Collections* (arestas com propriedades nativas como `_from` e `_to`) facilitou imensamente a modelagem da nossa rede social acadêmica sem complicação operacional.
---

## 🚀 Passo a Passo para Subir o Ambiente do Zero

## Pré-requisitos
- Docker Desktop
- Git

## Como subir o ambiente
1. `git clone <url-do-repositorio>`
2. `cd rede-academica-arango`
3. `docker compose up -d`
4. Aguarde o log `ready for business`: `docker compose logs -f arangodb`

## Carga de dados
docker compose exec arangodb arangosh --server.username root --server.password senha123 --javascript.execute /scripts/init.js

## Acesso
http://localhost:8529 | usuário: root | senha: senha123

## Recomeçar do zero
docker compose down -v && docker compose up -d

## Estrutura
- scripts/ : carga
- queries/ : CRUD e consultas
- sql/ : comparativo relacional
- prints/ : evidências