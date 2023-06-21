import { Email, Env } from './types'
import { objectMatchesStructure, sendEmail } from './utils'

//! Entrypoint.
export default {
  async queue(batch: MessageBatch<Email>, env: Env): Promise<void> {
    // Wait 1 second to rate-limit AWS SES API.
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Send emails.
    await Promise.all(
      batch.messages.map(async (email) => {
        if (
          !objectMatchesStructure(email.body, {
            from: {},
            to: {},
            template: {},
            variables: {},
          })
        ) {
          // TODO: Capture invalid emails.
          console.error('Invalid email:', JSON.stringify(email, null, 2))
          return
        }

        try {
          await sendEmail(env, email.body)
          email.ack()
        } catch (error) {
          // TODO: Capture failed emails.
          console.error(
            'Failed to send email:',
            JSON.stringify(email, null, 2),
            error
          )
          email.retry()
        }
      })
    )
  },
}
