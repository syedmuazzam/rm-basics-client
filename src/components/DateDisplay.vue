<template>
    <span>
        {{date.getMonth()}}/{{date.getDate()}}/{{date.getFullYear()}}
    </span>
</template>

<script>
export default {
    props: ['date']
}
</script>