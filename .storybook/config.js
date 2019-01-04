import {configure} from '@storybook/vue'

import Vue from 'vue'

// Import your component
import Component from '../src/index'

// Register your component
Vue.component('v-editor', Component)

function loadStories() {
  // You can require as many stories as you need.
  require('../stories')
}

configure(loadStories, module)
