import { ApiError } from '../errors/ApiError.js';

type RequestBody = Record<string, unknown>;

export function bodyRecord(value: unknown): RequestBody {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new ApiError(400, 'O corpo da requisição deve ser um objeto JSON');
  }

  return value as RequestBody;
}

export function requiredString(body: RequestBody, key: string, maxLength = 200, minLength = 1): string {
  const value = body[key];
  if (typeof value !== 'string' || value.trim().length < minLength || value.trim().length > maxLength) {
    throw new ApiError(400, `Campo "${key}" deve ter entre ${minLength} e ${maxLength} caracteres`);
  }

  return value.trim();
}

export function enumValue<T extends string>(
  value: unknown,
  allowed: readonly T[],
  field: string,
): T {
  if (typeof value !== 'string' || !allowed.includes(value as T)) {
    throw new ApiError(400, `Valor inválido para "${field}"`);
  }

  return value as T;
}

export function nonNegativeNumber(value: unknown, field: string): number {
  const parsed = typeof value === 'number'
    ? value
    : typeof value === 'string' && value.trim() !== ''
      ? Number(value)
      : Number.NaN;
  if (!Number.isFinite(parsed) || parsed < 0 || parsed > 9_999_999_999.99) {
    throw new ApiError(400, `Campo "${field}" deve ser um número maior ou igual a zero`);
  }

  return Math.round(parsed * 100) / 100;
}

export function uuidParam(value: string | string[] | undefined): string {
  if (typeof value !== 'string' || !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value)) {
    throw new ApiError(400, 'Identificador inválido');
  }

  return value;
}

export function isoDate(value: unknown, field: string): Date {
  if (typeof value !== 'string' || value.trim().length === 0) {
    throw new ApiError(400, `Campo "${field}" obrigatório`);
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    throw new ApiError(400, `Campo "${field}" deve conter uma data válida`);
  }

  return date;
}
