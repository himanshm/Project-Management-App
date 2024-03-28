export function generateSimpleGUID(): string {
  // Current timestamp
  const timestamp: string = Date.now().toString(36);

  // Random number
  const randomPart: string = Math.random().toString(36).substring(2, 15);

  // Combine timestamp and random part
  const guid: string = `${timestamp}-${randomPart}`;

  return guid;
}
