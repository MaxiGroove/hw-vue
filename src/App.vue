<template>
<div class="flex">
	<Paging />

  <Input />
  <Textarea />
  <Select />
  <!-- <Checkbox /> -->
  <Button />
  <Dropdown />
</div>
</template>

<script>
import Paging from '@/components/paging/Paging';
import Dropdown from './components/dropdown/Dropdown';
import Input from './components/input/Input';
import Textarea from './components/textarea/Textarea';
import Select from './components/select/Select';
import Checkbox from './components/checkbox/Checkbox';
import Button from './components/button/Button';

export default {
	components: {
    Paging,
    Dropdown,
    Input,
    Textarea,
    Select,
    Checkbox,
    Button,
}
}
</script>

<style lang="scss" scoped>
  .flex {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
</style>
