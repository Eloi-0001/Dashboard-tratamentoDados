import fs from "fs";
import pl from "nodejs-polars";

// ==============================
// Caminhos
// ==============================
const RAW_PATH = "./data/raw/dados.csv";
const OUT_PATH = "./data/processed/";

// ==============================
// Leitura do CSV como texto
// ==============================
const rawCsv = fs.readFileSync(RAW_PATH, "utf8");
const lines = rawCsv.split("\n");
const headers = lines[0].split(",");

// ==============================
// Parse simples
// ==============================
const rows = lines.slice(1).filter(l => l.trim() !== "");

const cleanedData = rows.map(line => {
  const values = line.split(",");
  const obj = {};

  headers.forEach((h, i) => {
    obj[h] = values[i] ?? null;
  });

  return obj;
});

// ==============================
// DataFrame Polars
// ==============================
let df = pl.DataFrame(cleanedData);

// corrigir header com erro
df = df.rename({
  "longitude\r": "longitude"
});

// ==============================
// Dimensão: Categoria
// ==============================
const dimCategoria = df
  .select("occurrence_category")
  .unique()
  .withRowCount("categoria_id");

dimCategoria.writeCSV(`${OUT_PATH}dim_categoria.csv`);

// ==============================
// Dimensão: Papel do solicitante
// ==============================
const dimApplicantRole = df
  .select("applicant_role")
  .unique()
  .withRowCount("applicant_role_id");

dimApplicantRole.writeCSV(`${OUT_PATH}dim_applicant_role.csv`);

// ==============================
// Tabela Fato (exemplo inicial)
// ==============================
const fato = df.select([
  "occurrence_id",
  "occurrence_category",
  "occurrence_subcategory",
  "priority",
  "applicant_role",
  "reported_timestamp",
  "resolved_timestamp",
  "latitude",
  "longitude"
]);

fato.writeCSV(`${OUT_PATH}fato_ocorrencia.csv`);

console.log("✅ ETL executado com sucesso");
