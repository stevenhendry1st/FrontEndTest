import {
  CContainer,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CCard,
  CCardBody,
  CForm,
  CFormLabel,
  CFormInput,
  CFormTextarea,
  CFormSelect,
  CButton,
} from '@coreui/react'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

function AddPost() {
  const [article, setArticle] = useState({
    title: '',
    content: '',
    category: '',
    status: '',
  })

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setArticle({
      ...article,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    await fetch('http://127.0.0.1:8000/article', {
      method: 'POST',
      body: JSON.stringify(article),
    })
      .then((response) => response.json())
      .then((data) => {
        setArticle({
          ...article,
          title: '',
          content: '',
          category: '',
          status: '',
        })
        alert('Tambah data success')
      })
  }

  return (
    <CContainer>
      <CCard>
        <CCardBody>
          <h3>Edit Article</h3>

          <CForm>
            <div className="mb-3">
              <CFormLabel htmlFor="title">Title</CFormLabel>
              <CFormInput
                type="title"
                id="title"
                name="title"
                placeholder="Input Title"
                value={article?.title}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="content">Content</CFormLabel>
              <CFormTextarea
                id="content"
                rows="3"
                name="content"
                placeholder="Input Content"
                value={article.content}
                onChange={handleChange}
              ></CFormTextarea>
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="category">Category</CFormLabel>
              <CFormInput
                type="category"
                id="category"
                name="category"
                value={article.category}
                placeholder="Input Category"
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="content">Status</CFormLabel>
              <CFormSelect
                aria-label="Default select example"
                name="status"
                value={article.status}
                onChange={handleChange}
              >
                <option value="">Select Status</option>
                <option value="Publish">Publish</option>
                <option value="Draft">Draft</option>
                <option value="Thrash">Thrash</option>
              </CFormSelect>
            </div>
            <CButton color="primary" onClick={handleSubmit}>
              Submit
            </CButton>
          </CForm>
        </CCardBody>
      </CCard>
    </CContainer>
  )
}

export default AddPost
