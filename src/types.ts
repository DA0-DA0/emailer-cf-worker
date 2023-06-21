export interface Env {
  // Secrets.
  AWS_REGION: string
  AWS_ACCESS_KEY_ID: string
  AWS_SECRET_ACCESS_KEY: string
}

export type Email = {
  from: string
  to: string
  template: string
  variables: Record<string, string>
}
