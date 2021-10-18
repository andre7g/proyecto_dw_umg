
<script>
  // Extensions
  import View from '@/views/View'

  // Mixins
  import LoadSections from '@/mixins/load-sections'

  export default {
    name: 'Home',

    metaInfo: { title: 'Home' },

    extends: View,

    mixins: [
      LoadSections([
        'hero',
        'we-help-your-success',
        'news-alt',
        'info-alt',
      ]),
    ],

    props: {
      id: {
        type: String,
        default: 'home',
      },
    },
  }
</script>
