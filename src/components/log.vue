<template>
  <div>
    <div>
      合言葉
      <input
        type="text"
        v-model="watchwordForm"
      >
    </div>
    <div>
      <div
        class="btn btn-light"
        v-on:click="startSubscribe"
      >
        start
      </div>
      <div
        class="btn btn-light"
        v-on:click="clearLogs"
      >
        clear
      </div>
    </div>
    <div>
      <ul class="list-group-flush text-left">
        <li
          class="list-group-item"
          v-for="log in logs"
          :key="log.time">
          <span class="badge">
            {{ filterLog(log.time) }}
          </span>
          <span class="">
            {{ log.text }}
          </span>
        </li>
      </ul>
      <div v-if="subscribeWord">
        <span>
          合言葉 {{ subscribeWord }} 
        </span>
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    </div>
    <div>
      <textarea v-model="copytext" />
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  data: function(){
    return  {
      watchwordForm: "",
      logs: [],
      firebaseRef: {},
      subscribeWord: "",
      copytext: ""
    }
  },
  mounted: function() {
    this.logs = JSON.parse(localStorage.logs || '[]')
    this.updateCopytext()
  },
  methods: {
    updateCopytext: function(){
      var text = ""
      this.logs.forEach(element=>{
        var d = new Date(element.time)
        text += d.toLocaleTimeString() + "\t" + element.text + "\n"
      })
      this.copytext = text
    },
    filterLog: function(date){
      console.log(date)
      var d = new Date(date)
      return d.toLocaleTimeString()
    },
    addedFunc: function(snapShot){
        var logs = this.logs
        logs.push({
          time: new Date(),
          text: snapShot.val().text
        })
        this.logs = logs
        localStorage.logs = JSON.stringify(logs)
        this.updateCopytext()
    },
    startSubscribe: function(){
      var firebaseRef
      firebaseRef = firebase.database().ref("comment/" + this.subscribeWord)
      firebaseRef.off('child_added', this.addedFunc)

      console.log("next")
      this.subscribeWord = this.watchwordForm
      firebaseRef = firebase.database().ref("comment/" + this.subscribeWord)
      firebaseRef.set(null).then( () => {
        firebaseRef.on("child_added", this.addedFunc).bind(this)
      })
    },
    clearLogs: function(){
      if (!window.confirm("記録されたログを削除します。良い？")){
        return
      }
      this.logs = []
      localStorage.logs = []
      this.updateCopytext()
    }
  }
}
</script>
