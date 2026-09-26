'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { faqs } from '@/lib/data'

export function FAQPanel() {
  const [faq, setFaq] = useState<number | null>(null)

  return <div className="faq-list">
    {faqs.map((item, index) => {
      const answerId = `faq-answer-${index + 1}`
      const isOpen = faq === index

      return <div className="faq-item" key={item.question}>
        <button type="button" onClick={() => setFaq(isOpen ? null : index)} aria-expanded={isOpen} aria-controls={answerId}>
          <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>{item.question}<ChevronDown className={isOpen ? 'flip' : ''} aria-hidden="true" />
        </button>
        {isOpen && <p id={answerId} className="faq-answer">{item.answer}</p>}
      </div>
    })}
  </div>
}
