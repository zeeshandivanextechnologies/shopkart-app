import React, { useState } from 'react';
import {
  MdHelpOutline,
  MdHeadsetMic,
  MdSend,
  MdCheckCircle,
  MdQuestionAnswer,
  MdDescription,
} from 'react-icons/md';

export const SupportHub = () => {
  const [ticketSubmitted, setTicketSubmitted] = useState(false);
  const [ticket, setTicket] = useState({
    subject: '',
    category: 'Payment Settlement',
    description: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setTicketSubmitted(true);
    setTimeout(() => setTicketSubmitted(false), 4000);
    setTicket({ subject: '', category: 'Payment Settlement', description: '' });
  };

  const faqs = [
    {
      q: 'When do I receive weekly payouts in my bank account?',
      a: 'Payouts are processed every Wednesday for the previous week (Monday to Sunday) orders delivered successfully.',
    },
    {
      q: 'How do I schedule a courier pickup if the delivery partner missed the slot?',
      a: 'Go to Orders & Dispatch, select the affected order, and click "Re-schedule Pickup". A dedicated Ekart/Delhivery rider will arrive within 2 hours.',
    },
    {
      q: 'What is the penalty for out-of-stock cancellations?',
      a: 'To maintain buyer trust, out-of-stock cancellations are subject to a 5% platform fee deduction unless marked inactive 24 hours prior.',
    },
  ];

  return (
    <div className="support-page">
      {/* Header */}
      <div className="d-flex flex-column flex-md-row md-align-items-center justify-content-between gap-3 mb-4">
        <div>
          <h4 className="fw-bold mb-1 text-dark">Seller Priority Helpdesk & Tickets</h4>
          <p className="text-muted small mb-0">
            Dedicated merchant support for order disputes, returns, and payment resolutions.
          </p>
        </div>
      </div>

      {ticketSubmitted && (
        <div className="alert alert-success d-flex align-items-center gap-2 rounded-3 border-0 shadow-sm mb-4">
          <MdCheckCircle size={20} />
          <span>Ticket #SR-88192 raised successfully! Your Seller Relationship Manager will reply within 30 minutes.</span>
        </div>
      )}

      <div className="row g-4">
        {/* Ticket Form */}
        <div className="col-12 col-lg-7">
          <div className="card border shadow-sm p-4 rounded-4 bg-white">
            <h6 className="fw-bold text-dark d-flex align-items-center gap-2 mb-3">
              <MdHeadsetMic className="text-primary" size={20} /> Raise a Priority Support Ticket
            </h6>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label small fw-semibold text-dark">Subject / Issue Summary</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Discrepancy in weekly payout settlement UTR"
                  required
                  value={ticket.subject}
                  onChange={(e) => setTicket({ ...ticket, subject: e.target.value })}
                />
              </div>

              <div className="mb-3">
                <label className="form-label small fw-semibold text-dark">Issue Department</label>
                <select
                  className="form-select"
                  value={ticket.category}
                  onChange={(e) => setTicket({ ...ticket, category: e.target.value })}
                >
                  <option value="Payment Settlement">Payment & Bank Settlements</option>
                  <option value="Courier Pickup">Courier Pickup & Logistics</option>
                  <option value="Customer Return Dispute">Customer Return (RTO / Damage Dispute)</option>
                  <option value="Catalog Approval">Product Listing & Brand Approval</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label small fw-semibold text-dark">Describe Issue in Detail</label>
                <textarea
                  className="form-control"
                  rows="4"
                  placeholder="Mention Order ID or Payout Reference if applicable..."
                  required
                  value={ticket.description}
                  onChange={(e) => setTicket({ ...ticket, description: e.target.value })}
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary d-flex align-items-center gap-2 px-4 py-2 rounded-3 fw-semibold">
                <MdSend size={18} /> Submit Ticket
              </button>
            </form>
          </div>
        </div>

        {/* FAQs */}
        <div className="col-12 col-lg-5">
          <div className="card border shadow-sm p-4 rounded-4 bg-white mb-3">
            <h6 className="fw-bold text-dark d-flex align-items-center gap-2 mb-3">
              <MdQuestionAnswer className="text-warning" size={20} /> Frequently Asked Questions
            </h6>
            <div className="accordion accordion-flush" id="faqAccordion">
              {faqs.map((faq, index) => (
                <div className="border-bottom py-2" key={index}>
                  <div className="fw-semibold small text-dark mb-1">{faq.q}</div>
                  <div className="text-muted small" style={{ fontSize: '12px' }}>{faq.a}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="card border-0 p-3 rounded-4 text-white" style={{ background: 'linear-gradient(135deg, #FB641B 0%, #D35400 100%)' }}>
            <div className="fw-bold mb-1">Instant Phone Hotline for Sellers</div>
            <div className="small text-white-50 mb-2">Available 24x7 for dispatch escalations</div>
            <div className="fw-bold fs-5 font-monospace">1800-202-9800</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportHub;
