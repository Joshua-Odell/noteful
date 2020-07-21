import React from 'react'

export default React.createContext({
  notes: [],
  folders: [],
  selectedFolder: 'all',
  addFolder: () => {},
  addNote: () => {},
  deleteNote: () => {},
})
