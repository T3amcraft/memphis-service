<script setup lang="ts">
const { business } = useAppConfig()
/* Baked in at build time — re-generate the site each year, or hardcode it. */
const year = new Date().getFullYear()

const socials = [
  { key: 'google', icon: 'i-lucide-star', label: 'Google Business Profile' },
  { key: 'facebook', icon: 'i-lucide-facebook', label: 'Facebook' },
  { key: 'instagram', icon: 'i-lucide-instagram', label: 'Instagram' }
] as const
</script>

<template>
  <footer class="bg-forest-950 text-cream-300">
    <div class="mx-auto max-w-(--ui-container) px-6 pt-20 pb-10">
      <div class="grid gap-12 lg:grid-cols-12">
        <!-- Brand -->
        <div class="lg:col-span-4">
          <div class="flex items-center gap-3">
            <BrandMark class="size-10 text-brass-400" />
            <span class="font-serif text-xl font-semibold text-cream-50">
              {{ business.name }}
            </span>
          </div>
          <p class="mt-5 max-w-sm leading-relaxed text-cream-400/85">
            {{ fill(copy.footer.blurb, { year: business.established }) }}
          </p>

          <div class="mt-7 flex gap-2">
            <UButton
              v-for="social in socials"
              :key="social.key"
              :href="business.social[social.key]"
              :icon="social.icon"
              :aria-label="social.label"
              target="_blank"
              rel="noopener"
              size="lg"
              variant="ghost"
              class="text-cream-300 hover:bg-white/10 hover:text-brass-300"
            />
          </div>
        </div>

        <!-- Services -->
        <div class="lg:col-span-3">
          <h2 class="font-serif text-base font-semibold tracking-wide text-cream-50">
            {{ copy.footer.servicesHeading }}
          </h2>
          <ul class="mt-5 space-y-3 text-sm">
            <li v-for="service in services" :key="service.id">
              <a
                :href="`#${service.id}`"
                class="text-cream-400/85 transition-colors hover:text-brass-300"
              >{{ service.title }}</a>
            </li>
            <li>
              <a href="#work" class="text-cream-400/85 transition-colors hover:text-brass-300">
                {{ copy.footer.beforeAfterLink }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Areas -->
        <div class="lg:col-span-2">
          <h2 class="font-serif text-base font-semibold tracking-wide text-cream-50">
            {{ copy.footer.areasHeading }}
          </h2>
          <ul class="mt-5 space-y-2.5 text-sm text-cream-400/85">
            <li v-for="area in serviceAreas.slice(0, 8)" :key="area">
              {{ area }}
            </li>
            <li>
              <a href="#areas" class="text-brass-300/90 hover:text-brass-200">
                {{ copy.footer.areasLink }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div class="lg:col-span-3">
          <h2 class="font-serif text-base font-semibold tracking-wide text-cream-50">
            {{ copy.footer.contactHeading }}
          </h2>
          <ul class="mt-5 space-y-4 text-sm">
            <li>
              <a
                :href="business.phoneHref"
                class="flex items-center gap-2.5 font-serif text-lg text-cream-50 hover:text-brass-300"
              >
                <UIcon name="i-lucide-phone" class="size-4 text-brass-400" />
                {{ business.phoneDisplay }}
              </a>
            </li>
            <li>
              <a
                :href="`mailto:${business.email}`"
                class="flex items-start gap-2.5 break-all text-cream-400/85 hover:text-brass-300"
              >
                <UIcon name="i-lucide-mail" class="mt-0.5 size-4 shrink-0 text-brass-400" />
                {{ business.email }}
              </a>
            </li>
            <li class="flex items-start gap-2.5 text-cream-400/85">
              <UIcon name="i-lucide-map-pin" class="mt-0.5 size-4 shrink-0 text-brass-400" />
              <span>
                {{ business.address.street }}<br>
                {{ business.address.city }}, {{ business.address.state }} {{ business.address.zip }}
              </span>
            </li>
            <li class="flex items-start gap-2.5 text-cream-400/85">
              <UIcon name="i-lucide-clock" class="mt-0.5 size-4 shrink-0 text-brass-400" />
              <span>
                <span v-for="slot in business.hours" :key="slot.label" class="block">
                  {{ slot.label }} · {{ slot.display }}
                </span>
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div class="mt-16 flex flex-col gap-4 border-t border-cream-100/10 pt-8 text-xs text-cream-500 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {{ year }} {{ business.name }}. Licensed
          {{ business.credentials.licenseNumber }} · Fully insured.
        </p>
        <a
          href="#top"
          class="inline-flex items-center gap-1.5 transition-colors hover:text-brass-300"
        >
          {{ copy.footer.backToTop }}
          <UIcon name="i-lucide-arrow-up" class="size-3.5" />
        </a>
      </div>
    </div>
  </footer>
</template>
