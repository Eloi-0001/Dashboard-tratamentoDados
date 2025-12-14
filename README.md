# 📊 ETL de Ocorrências com Polars (JavaScript)

Este repositório apresenta um **pipeline completo de ETL (Extract, Transform, Load)** desenvolvido em **JavaScript (Node.js)** utilizando a biblioteca **Polars JS**, com o objetivo de transformar um arquivo CSV bruto em um **modelo dimensional (estrela)** pronto para análises e dashboards.

O projeto foi **integralmente validado em execução**, com todos os problemas de inconsistência de dados, nomenclatura de colunas e limitações da biblioteca devidamente tratados.

---

## 🎯 Objetivo do Projeto

- Ler dados brutos de ocorrências a partir de um arquivo CSV
- Corrigir inconsistências estruturais do arquivo
- Padronizar e organizar os dados
- Gerar tabelas **fato** e **dimensão**
- Disponibilizar arquivos finais prontos para consumo analítico

O resultado é um conjunto de CSVs que podem ser utilizados em:
- Ferramentas de BI (Power BI, Tableau, Looker)
- Dashboards web (Chart.js, D3.js)
- Bancos de dados relacionais
- Projetos acadêmicos (TCC, disciplinas de BI e Engenharia de Dados)

---

## 🧱 Tecnologias Utilizadas

- **Node.js** (v18+)
- **Polars JS** (`nodejs-polars`)
- **JavaScript ES Modules**
- **CSV** como formato de persistência

---

## 📁 Estrutura do Projeto

```text
projeto_ocorrencias/
│
├── package.json
├── package-lock.json
├── node_modules/
│
├── etl_ocorrencias_polars.js
│
└── data/
    ├── raw/
    │   └── dados.csv
    │
    └── processed/
        ├── dim_categoria.csv
        ├── dim_applicant_role.csv
        └── fato_ocorrencia.csv
```

---

## ⚙️ Instalação

1. Instale o Node.js (versão 18 ou superior)

2. Clone o repositório e acesse a pasta do projeto

3. Instale as dependências:

```bash
npm install
```

---

## ▶️ Execução do Pipeline ETL

Execute o ETL com o comando:

```bash
npm start
```

Ou diretamente:

```bash
node etl_ocorrencias_polars.js
```

Ao final da execução, a mensagem abaixo confirma o sucesso:

```text
✅ ETL executado com sucesso
```

---

## 🧠 Funcionamento do Código

### 1️⃣ Leitura do CSV Bruto

- O arquivo `dados.csv` é lido diretamente do diretório `data/raw/`
- A leitura é feita inicialmente como texto para maior controle

---

### 2️⃣ Correção Estrutural do Arquivo

Durante a análise do dataset, foi identificada uma inconsistência no cabeçalho:

```text
longitude\r
```

Essa coluna é automaticamente corrigida para:

```text
longitude
```

Essa etapa garante a integridade do esquema de dados.

---

### 3️⃣ Criação do DataFrame

Após o parsing e correções iniciais, os dados são convertidos em um **DataFrame Polars**, que passa a ser utilizado para as operações analíticas.

---

### 4️⃣ Modelagem Dimensional

O pipeline implementa um **modelo estrela**, composto por:

#### 🔴 Tabela Fato

- **`fato_ocorrencia.csv`**
- Contém os eventos (ocorrências) e seus atributos principais

Campos típicos:
- `occurrence_id`
- `occurrence_category`
- `occurrence_subcategory`
- `priority`
- `applicant_role`
- `reported_timestamp`
- `resolved_timestamp`
- `latitude`
- `longitude`

---

#### 🟠 Tabelas Dimensão

- **`dim_categoria.csv`** → categorias únicas de ocorrência
- **`dim_applicant_role.csv`** → papéis/funções dos solicitantes

Cada dimensão:
- Possui valores únicos
- Inclui uma chave substituta (ID)
- Elimina redundâncias

---

## 🔗 Relacionamentos (Modelo Estrela)

```text
Dimensões (1) ─────► (N) Fato
```

Esse modelo é amplamente utilizado em sistemas de Business Intelligence por:
- Melhor performance
- Facilidade de consulta
- Simplicidade para visualizações

---

## 📊 Uso dos Dados Processados

Os arquivos gerados em `data/processed/` podem ser:

- Importados diretamente em ferramentas de BI
- Consumidos por bibliotecas de visualização em JavaScript
- Carregados em bancos SQL para análises avançadas

📌 O ETL é **independente da ferramenta de visualização**.

---

## ⚠️ Observações Importantes

- Os dados utilizados são **sintéticos**
- O projeto tem fins **educacionais e demonstrativos**
- Não é indicado para inferências reais

