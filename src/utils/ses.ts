import { SESClient, SendTemplatedEmailCommand } from '@aws-sdk/client-ses'

import { Email, Env } from '../types'

let ses: SESClient | undefined
const getSes = async ({
  AWS_REGION,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
}: Env) => {
  if (!ses) {
    ses = new SESClient({
      region: AWS_REGION,
      credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
      },
    })
  }

  return ses
}

export const sendEmail = async (
  env: Env,
  { from, to, template, variables }: Email
) => {
  const ses = await getSes(env)

  const command = new SendTemplatedEmailCommand({
    Source: from,
    Destination: {
      ToAddresses: [to],
    },
    Template: template,
    TemplateData: JSON.stringify(variables),
  })

  return ses.send(command)
}
