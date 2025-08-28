function formatTimestamp() {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = now.toLocaleDateString('en-US', { month: 'short' });
  const year = now.getFullYear();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const milliseconds = String(now.getMilliseconds()).padStart(3, '0');
  
  return `[${day}/${month}/${year}:${hours}:${minutes}:${seconds}.${milliseconds} +0900].  miles${now.getMilliseconds()}`;
}
console.log(formatTimestamp() )


const tmp = [
   {
    date: 1756187611.890354,
    time: '2025-08-26T05:53:31.890353734Z',
    stream: 'stdout',
    _p: 'F',
    remote: '172.31.19.57',
    method: 'GET',
    url: '/',
    body: {},
    kubernetes: {
      pod_name: 'aiagent-6fc9985745-7trrn',
      namespace_name: 'dev-aiagent',
      pod_id: '5e71002a-aa40-4aee-8640-45cc824deb5d',
      host: 'ip-172-31-133-189.ap-northeast-2.compute.internal',
      pod_ip: '172.31.137.38',
      container_name: 'aiagent',
      docker_id: '3514e99d0faaa5f9423bdc015d98ea34ec9c1f123092fd71a2af6550a04ea038',
      container_hash: '365485194891.dkr.ecr.ap-northeast-2.amazonaws.com/aiagent@sha256:b7764038f13a5366d92ccda9bf572398f5b1208dd2c67325194353a33fad9bde',
      container_image: '365485194891.dkr.ecr.ap-northeast-2.amazonaws.com/aiagent:latest'
    }
  },
  {
    date: 1756187611.947717,
    time: '2025-08-26T05:53:31.947716676Z',
    stream: 'stdout',
    _p: 'F',
    remote: '172.31.44.123',
    method: 'GET',
    url: '/',
    body: {},
    kubernetes: {
      pod_name: 'aiagent-6fc9985745-7trrn',
      namespace_name: 'dev-aiagent',
      pod_id: '5e71002a-aa40-4aee-8640-45cc824deb5d',
      host: 'ip-172-31-133-189.ap-northeast-2.compute.internal',
      pod_ip: '172.31.137.38',
      container_name: 'aiagent',
      docker_id: '3514e99d0faaa5f9423bdc015d98ea34ec9c1f123092fd71a2af6550a04ea038',
      container_hash: '365485194891.dkr.ecr.ap-northeast-2.amazonaws.com/aiagent@sha256:b7764038f13a5366d92ccda9bf572398f5b1208dd2c67325194353a33fad9bde',
      container_image: '365485194891.dkr.ecr.ap-northeast-2.amazonaws.com/aiagent:latest'
    }
  }
]

