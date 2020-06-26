<template>
    <ul>
        <li v-for="entity in cursor.dataEntities" :key="`${entity.$resource}_${entity.id}`">
            {{ entity.name }}
        </li>
    </ul>
    
</template>

<script>
export default {
  name: 'DamList',
  props: {
    cursor: { 
      type: Object, 
      required: true
    }
  },
}
</script>