import React from 'react'

const TextInput = ({error, placeholder, inputName, inputType}) => {
    
  return (
    <div className='w-full relative'>
        {
            
            error ? error?.map((err, index) => {
                return (
                    <div key={index} className='absolute top-[-25] '>
                        {err.errName === inputName && (
                            <span className='label-text-alt text-red-400'>{err.message}</span>
                        )}
                    </div>
                )
            }) : null                            
        }
        <label className="input w-full input-bordered flex items-center gap-2 rounded-xl text-slate-500">
            <input name={inputName} type={inputType} className="grow text-black" placeholder={placeholder} />
        </label>
    </div>
  )
}

export default TextInput
