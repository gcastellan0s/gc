const _tablePrefix = process.env.NUXT_TABLE_PREFIX ?? 'gc-dev';

export function getTableName(entity: string): string {
  return `${_tablePrefix}-${entity}`;
}

export async function getItem<T>(
  tableName: string,
  key: Record<string, string>,
): Promise<T | null> {
  // TODO: Implement DynamoDB GetItem using @aws-sdk/client-dynamodb
  console.log(`[db] getItem from ${tableName}`, key);
  return null;
}

export async function putItem<T>(tableName: string, item: T): Promise<T> {
  // TODO: Implement DynamoDB PutItem
  console.log(`[db] putItem to ${tableName}`, item);
  return item;
}

export async function deleteItem(
  tableName: string,
  key: Record<string, string>,
): Promise<void> {
  // TODO: Implement DynamoDB DeleteItem
  console.log(`[db] deleteItem from ${tableName}`, key);
}
