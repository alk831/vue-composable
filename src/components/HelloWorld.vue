<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
    <h3>Installed CLI Plugins</h3>
    <div :ref="buttonRef">
      Kontener
      <h3>Essential Links</h3>
      <h3>Ecosystem</h3>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { useFetch } from '../composables/useFetch';
import { useLocalStorage } from '../composables/useLocalStorage';
import { reactive, toRefs, createComponent } from '@vue/composition-api';
import { useClickOutside } from '../composables/useClickOutside';

export default createComponent({
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  setup(props, context) {
    const state = reactive({
      isOpened: false
    });

    const { isLoading, data: posts } = useFetch('/posts/1');
    const ls = useLocalStorage<LS>({ isLoggedIn: false });

    const buttonRef = useClickOutside(() => state.isOpened = false);

    return { props, buttonRef };
  }
});

interface LS {
  isLoggedIn: boolean
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
