/**
 * Turn a title into a URL slug: lower case, ASCII letters and digits,
 * words joined by single hyphens.
 *
 * Options:
 * - `maxLength`: positive integer. The slug is cut at the last hyphen within
 *   the limit (never leaving a trailing hyphen); if the first word alone is
 *   longer than the limit, it is cut to `maxLength` characters. Any other
 *   value throws a RangeError.
 */
export function slugify(text, options) {
  const maxLength = options?.maxLength;
  if (maxLength !== undefined && !(Number.isInteger(maxLength) && maxLength > 0)) {
    throw new RangeError(`maxLength must be a positive integer, got ${String(maxLength)}`);
  }

  const slug = String(text)
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  if (maxLength === undefined || slug.length <= maxLength) {
    return slug;
  }

  // A hyphen at index maxLength still leaves a whole-word prefix of maxLength.
  const cut = slug.lastIndexOf('-', maxLength);
  return cut > 0 ? slug.slice(0, cut) : slug.slice(0, maxLength);
}
