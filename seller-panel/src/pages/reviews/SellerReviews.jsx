import React from 'react';
import {
  MdStar,
  MdStarHalf,
  MdThumbUp,
  MdChatBubbleOutline,
  MdSearch,
} from 'react-icons/md';

export const SellerReviews = () => {
  const reviews = [
    {
      id: 1,
      customer: 'Priya Sundaram',
      rating: 5,
      date: '17 Nov 2026',
      product: 'ShopKart ANC Wireless Headphones V2',
      comment: 'Super fast delivery by seller! Sound quality is exceptional for this price point. Packaging was very secure.',
      helpful: 24,
    },
    {
      id: 2,
      customer: 'Mohit Chawla',
      rating: 5,
      date: '16 Nov 2026',
      product: 'Smart Fitness Tracker Band 7 Pro',
      comment: 'Original genuine brand product with full manufacturer warranty card included. Fully satisfied!',
      helpful: 18,
    },
    {
      id: 3,
      customer: 'Gaurav Aggarwal',
      rating: 4,
      date: '15 Nov 2026',
      product: 'Ultra Fast GaN 65W Charger',
      comment: 'Charging speed is genuine 65W as advertised. Slight delay of 1 day by Ekart delivery partner.',
      helpful: 7,
    },
    {
      id: 4,
      customer: 'Neha Kapoor',
      rating: 5,
      date: '12 Nov 2026',
      product: 'Mechanical Gaming Keyboard RGB',
      comment: 'Tactile blue switches feel amazing. Very reliable seller, 10/10 recommended.',
      helpful: 31,
    },
  ];

  return (
    <div className="seller-reviews-page">
      {/* Header */}
      <div className="d-flex flex-column flex-md-row md-align-items-center justify-content-between gap-3 mb-4">
        <div>
          <h4 className="fw-bold mb-1 text-dark">Customer Reviews & Seller Ratings</h4>
          <p className="text-muted small mb-0">
            Real feedback from verified marketplace buyers on your product quality and packaging.
          </p>
        </div>
      </div>

      {/* Ratings Overview KPI */}
      <div className="card border shadow-sm p-4 rounded-4 bg-white mb-4">
        <div className="row align-items-center">
          <div className="col-md-4 text-center border-end">
            <h1 className="display-4 fw-bold text-dark mb-0">4.9</h1>
            <div className="d-flex justify-content-center text-warning fs-4 mb-1">
              <MdStar /><MdStar /><MdStar /><MdStar /><MdStar />
            </div>
            <small className="text-muted">Based on 1,840+ verified buyer ratings</small>
          </div>
          <div className="col-md-8 ps-md-4 mt-3 mt-md-0">
            <div className="d-flex align-items-center gap-3 mb-1 small">
              <span className="text-muted" style={{ width: '60px' }}>5 Stars</span>
              <div className="progress flex-grow-1" style={{ height: '8px' }}>
                <div className="progress-bar bg-success" style={{ width: '88%' }}></div>
              </div>
              <span className="fw-bold text-dark">88%</span>
            </div>
            <div className="d-flex align-items-center gap-3 mb-1 small">
              <span className="text-muted" style={{ width: '60px' }}>4 Stars</span>
              <div className="progress flex-grow-1" style={{ height: '8px' }}>
                <div className="progress-bar bg-primary" style={{ width: '9%' }}></div>
              </div>
              <span className="fw-bold text-dark">9%</span>
            </div>
            <div className="d-flex align-items-center gap-3 mb-1 small">
              <span className="text-muted" style={{ width: '60px' }}>3 Stars</span>
              <div className="progress flex-grow-1" style={{ height: '8px' }}>
                <div className="progress-bar bg-warning" style={{ width: '2%' }}></div>
              </div>
              <span className="fw-bold text-dark">2%</span>
            </div>
            <div className="d-flex align-items-center gap-3 small">
              <span className="text-muted" style={{ width: '60px' }}>1-2 Stars</span>
              <div className="progress flex-grow-1" style={{ height: '8px' }}>
                <div className="progress-bar bg-danger" style={{ width: '1%' }}></div>
              </div>
              <span className="fw-bold text-dark">1%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="card border shadow-sm rounded-4 overflow-hidden bg-white">
        <div className="card-header bg-white py-3 px-4 border-bottom">
          <h6 className="fw-bold mb-0 text-dark">Recent Verified Feedback</h6>
        </div>
        <div className="p-4">
          {reviews.map((r) => (
            <div className="border-bottom pb-3 mb-3" key={r.id}>
              <div className="d-flex justify-content-between align-items-center mb-1">
                <div className="fw-semibold text-dark">{r.customer}</div>
                <small className="text-muted">{r.date}</small>
              </div>
              <div className="d-flex align-items-center gap-2 mb-2">
                <span className="badge bg-success px-2 py-1 small d-flex align-items-center gap-1">
                  {r.rating} ★
                </span>
                <span className="text-muted small">Purchased: <strong className="text-dark">{r.product}</strong></span>
              </div>
              <p className="text-secondary small mb-2">{r.comment}</p>
              <div className="d-flex align-items-center gap-1 text-muted small">
                <MdThumbUp size={14} /> <span>{r.helpful} buyers found this helpful</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SellerReviews;
