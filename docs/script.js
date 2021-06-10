Vue.createApp({
  data () {
    return {
      isLoading: true,
      profiles: [],
      search: ''
    }
  },
  computed: {
    searchProfiles () {
      if (!this.search) return this.profiles
      const founds = []
      for (const profile of this.profiles) {
        if (profile.full_name.includes(this.search)) {
          founds.push(profile)
        }
      }
      return founds
    }
  },
  async mounted () {
    const jsonUrl = `./profiles.json?timestamp=${+new Date()}`
    try {
      const { data } = await axios.get(jsonUrl)
      this.profiles = shuffle(data)
    } catch (error) {
      console.error(error)
    }
    this.isLoading = false
  },
  methods: {
    avatarUrl (profile) {
      return `./avatars/${profile.file_name}.svg`
    }
  }
}).mount('#app')
