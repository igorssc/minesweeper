<script setup lang="ts"></script>

<template>
  <li class="text-gray-700 dark:text-gray-400 flex gap-2 items-center text-sm">
    <span class="font-medium text-gray-900 dark:text-gray-300"> <slot name="title" />: </span>
    <span class="font-medium"> <slot name="item" /></span>
    <span>
      <slot name="tooltip" />
    </span>
  </li>
</template>
