export function cs(classNames: (string | undefined)[]): string {
  return classNames.filter((v) => !!v).join(" ");
}
