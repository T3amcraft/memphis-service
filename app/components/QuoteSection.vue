<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const { business, forms } = useAppConfig()
const toast = useToast()

const serviceOptions = [
  'Fence painting & staining',
  'Sealing & waterproofing',
  'Delta Guard annual program',
  'Not sure — please advise'
]

const lengthOptions = [
  'Under 100 ft',
  '100 – 200 ft',
  '200 – 350 ft',
  '350 – 600 ft',
  'Over 600 ft',
  'Not sure'
]

const schema = z.object({
  name: z.string({ error: 'Please enter your name' }).min(2, 'Please enter your name'),
  phone: z
    .string({ error: 'Please enter a phone number we can reach you on' })
    .min(10, 'Please enter a phone number we can reach you on')
    .regex(/^[\d\s()+.-]{10,20}$/, 'Digits, spaces, brackets and dashes only'),
  email: z.email('Please check the email address'),
  location: z.string({ error: 'A street or neighbourhood is enough' }).min(3, 'A street or neighbourhood is enough'),
  service: z.string({ error: 'Pick the closest match' }).min(1, 'Pick the closest match'),
  length: z.string({ error: 'A rough estimate is fine' }).min(1, 'A rough estimate is fine'),
  message: z.string().max(1200, 'Please keep this under 1200 characters').optional(),
  consent: z.literal(true, 'We need your permission to reply'),
  /* Honeypot — real people leave this empty. */
  company: z.string().max(0).optional()
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  name: undefined,
  phone: undefined,
  email: undefined,
  location: undefined,
  service: undefined,
  length: undefined,
  message: undefined,
  consent: undefined,
  company: ''
})

const pending = ref(false)
const sent = ref(false)

async function onSubmit(event: FormSubmitEvent<Schema>) {
  if (event.data.company) return // silently drop bots

  pending.value = true

  const payload = {
    name: event.data.name,
    phone: event.data.phone,
    email: event.data.email,
    location: event.data.location,
    service: event.data.service,
    fenceLength: event.data.length,
    message: event.data.message ?? '',
    source: 'rivercityfenceandseal.com — quote form'
  }

  try {
    if (!forms.quoteEndpoint) {
      /* DEMO MODE — no endpoint configured yet. See app/app.config.ts */
      console.info('[quote form] demo mode, nothing was sent. Payload:', payload)
      await new Promise(resolve => setTimeout(resolve, 700))
    }
    else {
      await $fetch(forms.quoteEndpoint, { method: 'POST', body: payload })
    }

    sent.value = true
  }
  catch {
    toast.add({
      title: 'That did not go through',
      description: `Sorry — please call ${business.phoneDisplay} and we will take the details over the phone.`,
      color: 'error',
      icon: 'i-lucide-triangle-alert'
    })
  }
  finally {
    pending.value = false
  }
}

const nextSteps = [
  'We call or text back the same working day',
  'We walk the fence line with you and measure the run',
  'A written, itemised quote — valid for 30 days'
]
</script>

<template>
  <section id="quote" class="relative overflow-hidden bg-forest-900 py-24 lg:py-32">
    <div
      class="absolute inset-0 opacity-[0.05]"
      style="background-image: radial-gradient(circle at 1px 1px, #faf6ef 1px, transparent 0); background-size: 22px 22px;"
      aria-hidden="true"
    />

    <div class="relative mx-auto max-w-(--ui-container) px-6">
      <div class="grid gap-14 lg:grid-cols-12 lg:gap-16">
        <!-- Left: the pitch and the direct lines -->
        <div class="min-w-0 lg:col-span-5">
          <SectionHeading
            tone="light"
            eyebrow="Free estimate"
            title="Tell us about your fence."
            lede="Send the details and we will come out, measure it, read the condition of the wood, and give you a straight number in writing."
          />

          <ol class="mt-10 space-y-4">
            <li
              v-for="(step, i) in nextSteps"
              :key="step"
              class="flex items-start gap-3.5 text-cream-200/90"
              :data-reveal="100 + i * 80"
            >
              <span class="flex size-7 shrink-0 items-center justify-center rounded-full bg-brass-500/15 font-serif text-sm font-semibold text-brass-300 ring-1 ring-brass-400/25">
                {{ i + 1 }}
              </span>
              <span class="leading-relaxed">{{ step }}</span>
            </li>
          </ol>

          <div class="mt-10 space-y-1 border-t border-cream-100/12 pt-8">
            <a
              :href="business.phoneHref"
              class="group flex items-center gap-4 rounded-lg px-3 py-3 transition-colors hover:bg-white/5"
            >
              <span class="flex size-11 shrink-0 items-center justify-center rounded-lg bg-brass-500/15 text-brass-300 ring-1 ring-brass-400/25">
                <UIcon name="i-lucide-phone" class="size-5" />
              </span>
              <span>
                <span class="block text-xs tracking-[0.14em] text-cream-400/70 uppercase">Call or text</span>
                <span class="block font-serif text-xl text-cream-50 group-hover:text-brass-200">{{ business.phoneDisplay }}</span>
              </span>
            </a>

            <a
              :href="`mailto:${business.email}?subject=Fence%20estimate%20request`"
              class="group flex items-center gap-4 rounded-lg px-3 py-3 transition-colors hover:bg-white/5"
            >
              <span class="flex size-11 shrink-0 items-center justify-center rounded-lg bg-brass-500/15 text-brass-300 ring-1 ring-brass-400/25">
                <UIcon name="i-lucide-mail" class="size-5" />
              </span>
              <span class="min-w-0">
                <span class="block text-xs tracking-[0.14em] text-cream-400/70 uppercase">Email</span>
                <span class="block truncate font-serif text-lg text-cream-50 group-hover:text-brass-200">{{ business.email }}</span>
              </span>
            </a>

            <div class="flex items-center gap-4 px-3 py-3">
              <span class="flex size-11 shrink-0 items-center justify-center rounded-lg bg-brass-500/15 text-brass-300 ring-1 ring-brass-400/25">
                <UIcon name="i-lucide-clock" class="size-5" />
              </span>
              <div class="text-sm text-cream-200/85">
                <span class="block text-xs tracking-[0.14em] text-cream-400/70 uppercase">Hours</span>
                <span v-for="slot in business.hours" :key="slot.days" class="block">
                  {{ slot.days }} · {{ slot.time }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: the form -->
        <div class="min-w-0 lg:col-span-7" data-reveal="60">
          <div class="rounded-xl border border-cream-200/60 bg-cream-50 p-7 shadow-[0_40px_80px_-50px_rgba(0,0,0,0.7)] sm:p-9">
            <Transition
              mode="out-in"
              enter-active-class="transition duration-300 ease-out"
              enter-from-class="opacity-0 translate-y-2"
              leave-active-class="transition duration-150 ease-in"
              leave-to-class="opacity-0"
            >
              <!-- Success -->
              <div v-if="sent" class="py-8 text-center">
                <span class="mx-auto flex size-16 items-center justify-center rounded-full bg-forest-800 text-brass-300">
                  <UIcon name="i-lucide-check" class="size-8" />
                </span>
                <h3 class="mt-6 font-serif text-3xl font-semibold text-forest-900">
                  Request received
                </h3>
                <p class="mx-auto mt-4 max-w-md leading-relaxed text-cream-700">
                  Thank you — we will be in touch the same working day to book your
                  on-site estimate. If it is urgent, calling is always fastest.
                </p>
                <div class="rule-diamond my-8">
                  <UIcon name="i-lucide-diamond" class="size-2.5" />
                </div>
                <UButton
                  :href="business.phoneHref"
                  size="xl"
                  icon="i-lucide-phone"
                  class="bg-forest-800 font-semibold text-cream-50 hover:bg-forest-700"
                >
                  {{ business.phoneDisplay }}
                </UButton>
                <p v-if="!forms.quoteEndpoint" class="mt-8 text-xs text-cream-600">
                  Demo mode — no endpoint is configured yet, so nothing was sent.
                  Add one in <code class="rounded bg-cream-200/70 px-1 py-0.5">app/app.config.ts</code>.
                </p>
              </div>

              <!-- Form -->
              <UForm
                v-else
                :schema="schema"
                :state="state"
                class="space-y-5"
                @submit="onSubmit"
              >
                <div class="grid gap-5 sm:grid-cols-2">
                  <UFormField label="Your name" name="name" required>
                    <UInput
                      v-model="state.name"
                      size="xl"
                      class="w-full"
                      placeholder="Jordan Whitaker"
                      autocomplete="name"
                    />
                  </UFormField>

                  <UFormField label="Phone" name="phone" required>
                    <UInput
                      v-model="state.phone"
                      size="xl"
                      class="w-full"
                      type="tel"
                      placeholder="(901) 555-0142"
                      autocomplete="tel"
                    />
                  </UFormField>
                </div>

                <div class="grid gap-5 sm:grid-cols-2">
                  <UFormField label="Email" name="email" required>
                    <UInput
                      v-model="state.email"
                      size="xl"
                      class="w-full"
                      type="email"
                      placeholder="you@example.com"
                      autocomplete="email"
                    />
                  </UFormField>

                  <UFormField label="Street or neighbourhood" name="location" required>
                    <UInput
                      v-model="state.location"
                      size="xl"
                      class="w-full"
                      placeholder="Germantown, 38139"
                      autocomplete="address-level2"
                    />
                  </UFormField>
                </div>

                <div class="grid gap-5 sm:grid-cols-2">
                  <UFormField label="What do you need?" name="service" required>
                    <USelect
                      v-model="state.service"
                      :items="serviceOptions"
                      size="xl"
                      class="w-full"
                      placeholder="Choose a service"
                    />
                  </UFormField>

                  <UFormField label="Roughly how much fence?" name="length" required>
                    <USelect
                      v-model="state.length"
                      :items="lengthOptions"
                      size="xl"
                      class="w-full"
                      placeholder="Estimate is fine"
                    />
                  </UFormField>
                </div>

                <UFormField
                  label="Anything else we should know?"
                  name="message"
                  hint="Optional"
                >
                  <UTextarea
                    v-model="state.message"
                    :rows="4"
                    size="xl"
                    class="w-full"
                    placeholder="Age of the fence, wood type, whether it has been stained before, gates, HOA colour requirements — anything helps."
                  />
                </UFormField>

                <!-- Honeypot: hidden from people, tempting to bots -->
                <div class="sr-only" aria-hidden="true">
                  <label>
                    Company
                    <input
                      v-model="state.company"
                      type="text"
                      tabindex="-1"
                      autocomplete="off"
                    >
                  </label>
                </div>

                <UFormField name="consent">
                  <UCheckbox
                    v-model="state.consent"
                    label="Yes, contact me about this request."
                    description="We use your details for this estimate only — never sold, never added to a mailing list."
                  />
                </UFormField>

                <UButton
                  type="submit"
                  size="xl"
                  block
                  :loading="pending"
                  trailing-icon="i-lucide-arrow-right"
                  class="bg-forest-800 font-semibold text-cream-50 hover:bg-forest-700"
                >
                  {{ pending ? 'Sending…' : 'Request my free estimate' }}
                </UButton>

                <p class="text-center text-xs leading-relaxed text-cream-600">
                  No obligation, no deposit, and no sales visit disguised as an
                  estimate. Prefer to talk?
                  <a :href="business.phoneHref" class="font-semibold text-forest-800 underline decoration-brass-400 decoration-2 underline-offset-2">
                    {{ business.phoneDisplay }}
                  </a>
                </p>
              </UForm>
            </Transition>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
