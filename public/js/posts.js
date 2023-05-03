document.body.addEventListener('submit', e => {
  const postId = e.target.dataset.id
  // console.log(e.target)
  // console.log(postId);
	if (e.target.matches('.vote-up')) {
		e.preventDefault();
		voteUp(postId)
	} else if (e.target.matches('.vote-down')) {
		 e.preventDefault();
    voteDown(postId)
	}
})

async function voteUp(postId) {
  console.log('voted up!');
	const res = await fetch(`posts/${postId}/vote-up`, { method: 'PUT' })
	const data = await res.json()
}

async function voteDown(postId) {
  console.log('voted down!');
	const res = await fetch(`posts/${postId}/vote-down`, { method: 'PUT' })
	const data = await res.json()
}