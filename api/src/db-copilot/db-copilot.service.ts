import { Injectable } from '@nestjs/common';
import { InjectDrizzle } from '@nestjs/drizzle';
import { sql } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

@Injectable()
export class DbCopilotService {
  constructor(@InjectDrizzle('readonly') private readonly db: NodePgDatabase) {}

  async getSchema() {
    const columns = await this.db
      .select({
        tableName: sql<string>`table_name`,
        columnName: sql<string>`column_name`,
        dataType: sql<string>`data_type`,
      })
      .from(sql`information_schema.columns`)
      .where(sql`table_schema = 'public'`);

    const foreignKeys = await this.db
      .select({
        tableName: sql<string>`tc.table_name`,
        columnName: sql<string>`kcu.column_name`,
        referencedTable: sql<string>`ccu.table_name`,
        referencedColumn: sql<string>`ccu.column_name`,
      })
      .from(sql`information_schema.table_constraints tc`)
      .innerJoin(
        sql`information_schema.key_column_usage kcu`,
        sql`
      tc.constraint_name = kcu.constraint_name
      AND tc.table_schema = kcu.table_schema
    `,
      )
      .innerJoin(
        sql`information_schema.constraint_column_usage ccu`,
        sql`
      ccu.constraint_name = tc.constraint_name
      AND ccu.table_schema = tc.table_schema
    `,
      ).where(sql`
    tc.constraint_type = 'FOREIGN KEY'
    AND tc.table_schema = 'public'
  `);

    return {
      columns,
      foreignKeys,
    };
  }

  async executeQuery(query: string) {
    return this.db.execute(sql.raw(query));
  }
}
