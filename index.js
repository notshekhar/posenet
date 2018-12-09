let nose = {
      x:-10,
      y:-10
    }, leftEye = {
      x:-10,
      y:-10
    }, rightEye = {
      x:-10,
      y:-10
    }, leftEar = {
      x:-10,
      y:-10
    }, rightEar = {
      x:-10,
      y:-10
    }
    let spinner = document.querySelector('.spinner')
    let video = document.querySelector('#video')
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia){
      navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream){
        video.srcObject = stream
        video.play()
      })
    }
    let canvas = document.querySelector('#canvas')
    let ctx = canvas.getContext('2d')
    let posenet = ml5.poseNet(video, loaded)
    function loaded(){
      console.log('loaded')
      spinner.style.display = `none`
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
    }
    posenet.on('pose', r => {
      if(r.length>=1){
        let pose = r[0].pose.keypoints
        if(r[0].pose.score<0.1){
          nose = {
            x:-10,
            y:-10
          }, leftEye = {
            x:-10,
            y:-10
          }, rightEye = {
            x:-10,
            y:-10
          }, leftEar = {
            x:-10,
            y:-10
          }, rightEar = {
            x:-10,
            y:-10
          }
        }else{
          if(pose[0].score>0.1){
            nose = pose[0].position
          }else{
            nose = {x:-10, y:-10}
          }
          if(pose[1].score>0.1){
            leftEye = pose[1].position
          }else{
            leftEye = {x:-10, y:-10}
          }
          if(pose[2].score>0.1){
            rightEye = pose[2].position
          }else{
            rightEye = {x:-10, y:-10}
          }
          if(pose[3].score>0.1){
            leftEar = pose[3].position
          }else{
            leftEar = {x:-10, y:-10}
          }
          if(pose[4].score>0.1){
            rightEar = pose[4].position
          }else{
            rightEar = {x:-10, y:-10}
          }
        }
      }else{
        nose = {
          x:-10,
          y:-10
        }, leftEye = {
          x:-10,
          y:-10
        }, rightEye = {
          x:-10,
          y:-10
        }, leftEar = {
          x:-10,
          y:-10
        }, rightEar = {
          x:-10,
          y:-10
        }
      }
    })
    setInterval(()=>{
      ctx.drawImage(video, 0, 0)
      ctx.beginPath()
      ctx.arc(nose.x/800*canvas.width, nose.y/800*canvas.height, 10, 0, 2*Math.PI)
      ctx.fillStyle = 'red'
      ctx.fill()
      ctx.closePath()
      ctx.beginPath()
      ctx.arc(leftEye.x/800*canvas.width, leftEye.y/800*canvas.height, 10, 0, 2*Math.PI)
      ctx.fillStyle = 'red'
      ctx.fill()
      ctx.closePath()
      ctx.beginPath()
      ctx.arc(rightEye.x/800*canvas.width, rightEye.y/800*canvas.height, 10, 0, 2*Math.PI)
      ctx.fillStyle = 'red'
      ctx.fill()
      ctx.closePath()
      ctx.beginPath()
      ctx.arc(leftEar.x/800*canvas.width, leftEar.y/800*canvas.height, 10, 0, 2*Math.PI)
      ctx.fillStyle = 'red'
      ctx.fill()
      ctx.closePath()
      ctx.beginPath()
      ctx.arc(rightEar.x/800*canvas.width, rightEar.y/800*canvas.height, 10, 0, 2*Math.PI)
      ctx.fillStyle = 'red'
      ctx.fill()
      ctx.closePath()

    }, 16)
