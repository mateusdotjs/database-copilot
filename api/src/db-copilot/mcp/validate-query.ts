import { parse } from 'pgsql-parser';

const WRITE_STATEMENTS = new Set(['InsertStmt', 'UpdateStmt', 'DeleteStmt']);

const PARSE_ERROR = 'Could not parse the SQL. Send one SELECT statement.';
const SINGLE_SELECT = 'Only a single SELECT is allowed.';
const LIMIT_REQUIRED = 'The SELECT must include a LIMIT.';

export async function assertSingleSelect(query: string) {
  let parsed: Awaited<ReturnType<typeof parse>>;

  try {
    parsed = await parse(query);
  } catch {
    throw new Error(PARSE_ERROR);
  }

  const [statement, ...rest] = parsed.stmts ?? [];

  if (!statement || rest.length > 0) {
    throw new Error(SINGLE_SELECT);
  }

  const stmt = statement.stmt;

  if (!stmt || !('SelectStmt' in stmt)) {
    throw new Error(SINGLE_SELECT);
  }

  const select = stmt.SelectStmt;

  if (select.intoClause || containsWrite(stmt)) {
    throw new Error(SINGLE_SELECT);
  }

  if (
    select.limitOption !== 'LIMIT_OPTION_COUNT' ||
    select.limitCount == null
  ) {
    throw new Error(LIMIT_REQUIRED);
  }
}

function containsWrite(node: unknown): boolean {
  if (!node || typeof node !== 'object') {
    return false;
  }

  if (Array.isArray(node)) {
    return node.some(containsWrite);
  }

  return Object.entries(node).some(
    ([key, value]) => WRITE_STATEMENTS.has(key) || containsWrite(value),
  );
}
