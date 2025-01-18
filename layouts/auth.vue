<template>
  <div>
    <VApp>
      <LayoutNavbar />
      <VMain>
        <VContainer>
          <VRow
            no-gutters
            align="center"
            justify="space-between"
            class="fill-height"
          >
            <VCol cols="12" md="3" sm="6">
              <slot :key="$route.name" />
            </VCol>
            <VCol
              sm="6"
              md="7"
              v-if="$vuetify.display.smAndUp"
              class="position-relative my-5"
            >
              <VImg 
                aspect-ratio="1/1"
                cover
                width="700"
                class="mx-auto rounded-lg"
                src="/auth-bg.png"
              ></VImg>

              <div class="z-9 text-center mt-4">
                <span class="d-block text-black  font-weight-medium font-28"
                  >Next Day Delivery</span
                >
                <p class="mt-2 text-black  font-weight-regular font-20">
                  ZumraFood, an online platform bringing Asian cuisine to Egypt
                </p>
              </div>
            </VCol>
          </VRow>
        </VContainer>
      </VMain>
      <LayoutFooter />
    </VApp>
  </div>
</template>

<script lang="ts" setup></script>

<style></style>
