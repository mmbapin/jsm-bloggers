import React, {useRef, useState, useEffect} from 'react'
import { submitComment } from '../services'

const CommentsForm = ({slug}) => {
  const [error, setError] = useState(false)
	const [localStorage, setLocalStorage] = useState(null)
	const [showSuccessMessage, setShowSuccessMessage] = useState(false)
	const commentEl = useRef()
	const nameEl = useRef()
	const emailEl = useRef()
	const storeDataEl = useRef()

	useEffect(() => {
		nameEl.current.value = window.localStorage.getItem('name')
		emailEl.current.value = window.localStorage.getItem('email')
	}, [])

	const handleCommentSubmission = () => {
		setError(false)
		const { value: comment } = commentEl.current
		const { value: name } = nameEl.current
		const { value: email } = emailEl.current
		const { checked: storeData } = storeDataEl.current

		if( !comment || !name || !email ){
			setError(true)
			return
		}

		const commentObj = { name, email, comment, slug }

		if (storeData) {
			window.localStorage.setItem('name', name)
			window.localStorage.setItem('email', email)
		}else{
			window.localStorage.removeItem('name', name)
			window.localStorage.removeItem('email', email)
		}

		submitComment(commentObj)
			.then((res) => {
				setShowSuccessMessage(true)
				setTimeout(() => {
					setShowSuccessMessage(false)
				}, 3000)
			})
	}

  return (
    <div className='bg-white shadow-lg rounded-lg p-8 mb-8 pb-12'>
      <h3 className='text-xl mb-8 font-semibold border-b pb-4'>CommentsForm</h3>
			<div className='grid grid-cols-1 gap-4 mb-4'>
				<textarea 
					ref={commentEl}
					className='p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-grap-20 bg-gray-100 text-grap-700'
					name='comment'
					placeholder='Comment'
				/>
			</div>

			<div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4'>
				<input 
					type="text" 
					name="name"
					placeholder='Name'
					ref={nameEl}
					className='p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-grap-20 bg-gray-100 text-grap-700'
				/>

				<input 
					type="email" 
					name="email"
					placeholder='Email'
					ref={emailEl}
					className='p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-grap-20 bg-gray-100 text-grap-700'
				/>
			</div>
			<div className='grid grid-cols-1 gap-4 mb-4'>
				<div>
					<input type="checkbox" ref={storeDataEl} id='storeData' name='storeData' value='true'/>
					<label className='text-gray-500 cursor-pointer ml-2' htmlFor="storeData"> Save my email and name next time I comment.	</label>
				</div>
			</div>
			{error && <p className='text-xs text-red-500'>All fields are required.</p>}
			<div className='mt-8'>
				<button 
					type='button' 
					onClick={handleCommentSubmission}
					className='transition duration-500 ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg rounded-full text-white px-8 py-3 cursor-pointer'
				>
					Post Comment 
				</button>
				{showSuccessMessage && <span className='text-xl float-right font-semibold mt-3 text-green-500'>Comment submitted for review</span>}
			</div>
    </div>
  )
}

export default CommentsForm