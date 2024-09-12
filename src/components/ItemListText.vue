<script setup lang="ts"></script>

<template>
  <li class="text-gray-700 dark:text-gray-400">
    <span class="font-medium text-gray-900 dark:text-gray-300"> <slot name="title" />: </span>
    <span class="font-medium"> <slot name="item" /></span>
  </li>
</template>
