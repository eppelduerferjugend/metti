
import { useState } from 'react'
import FieldTextView from '../field-text/field-text'

export default function PageLoginView () {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div>
      <FieldTextView
        label='Benotzernumm'
        value={username}
        onChange={setUsername}
      />
      <FieldTextView
        label='Passwuert'
        value={password}
        onChange={setPassword}
        password
      />
    </div>
  )
}
