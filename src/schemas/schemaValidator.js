export function validate (schema, object) {
  return schema.safeParse(object)
}

export function validatePartial (schema, object) {
  return schema.partial().safeParse(object)
}
