<script setup lang="ts">
const { business } = useAppConfig()
</script>

<template>
  <section id="faq" class="border-y border-cream-200 bg-cream-100 py-24 lg:py-32">
    <div class="mx-auto max-w-(--ui-container) px-6">
      <div class="grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div class="lg:col-span-4">
          <div class="lg:sticky lg:top-32">
            <SectionHeading
              eyebrow="Straight answers"
              title="Questions we get on almost every estimate."
              lede="If yours is not here, ask it. We would rather talk you out of work you do not need than sell you a coat of stain your fence cannot hold."
            />
            <UButton
              :href="`mailto:${business.email}`"
              size="lg"
              variant="outline"
              icon="i-lucide-mail"
              class="mt-8 border-forest-800/25 font-semibold text-forest-800 hover:bg-cream-200/60"
              data-reveal="150"
            >
              {{ business.email }}
            </UButton>
          </div>
        </div>

        <div class="lg:col-span-8" data-reveal="60">
          <UAccordion
            :items="faqs"
            type="multiple"
            :ui="{
              root: 'divide-y divide-cream-300/70 border-y border-cream-300/70',
              item: 'border-0 py-1',
              trigger: 'py-5 gap-4 text-left cursor-pointer group',
              label: 'font-serif text-lg sm:text-xl font-semibold text-forest-900 leading-snug',
              trailingIcon: 'size-5 text-brass-600 shrink-0',
              content: 'text-forest-900/80',
              body: 'pb-6 pr-8 text-base leading-relaxed'
            }"
          />
        </div>
      </div>
    </div>
  </section>
</template>
