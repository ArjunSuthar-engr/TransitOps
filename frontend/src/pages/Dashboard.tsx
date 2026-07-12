

export default function Dashboard() {
  const recentOrders = [
    { id: '#324561324', assignedTo: 'Rajesh Kumar', pickup: 'Mumbai, IN', delivery: 'Pune, IN', estDelivery: '12 Sep, 2024', status: 'Picked up', dotColor: 'bg-orange-500' },
    { id: '#183896772', assignedTo: 'Amit Singh', pickup: 'Delhi, IN', delivery: 'Jaipur, IN', estDelivery: '14 Sep, 2024', status: 'In transit', dotColor: 'bg-green-500' },
    { id: '#267189302', assignedTo: 'Vikram Patel', pickup: 'Bengaluru, IN', delivery: 'Chennai, IN', estDelivery: '15 Sep, 2024', status: 'Picked up', dotColor: 'bg-orange-500' },
    { id: '#942625346', assignedTo: 'Priya Sharma', pickup: 'Hyderabad, IN', delivery: 'Ahmedabad, IN', estDelivery: '18 Sep, 2024', status: 'In transit', dotColor: 'bg-green-500' },
  ];

  return (
    <div className="flex flex-col gap-8 w-full pb-10 font-sans">
      
      {/* -------------------------------------------------------------
          MAIN TOP HERO SECTION (Matches Reference Image) 
          ------------------------------------------------------------- */}
      <div className="w-full rounded-[2rem] bg-[#F1F6F3] p-6 lg:p-8 relative shadow-sm border border-brand-border/30">
        
        {/* TOP ROW: Search & Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
          {/* Search */}
          <div className="relative w-full sm:max-w-xs flex items-center">
            <svg className="absolute left-0 h-4.5 w-4.5 text-brand-neutral-dark/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              type="text" 
              placeholder="Search order..." 
              className="w-full pl-7 pr-4 py-1.5 bg-transparent focus:outline-none text-sm font-sans placeholder:text-brand-neutral-dark/50 text-brand-primary"
            />
          </div>
          
          {/* Actions */}
          <div className="flex items-center gap-3 sm:gap-5">
            <button className="flex items-center gap-2 text-[13px] font-semibold text-brand-primary hover:opacity-70 transition-opacity">
              <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              Export
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-brand-primary text-white text-[13px] font-semibold rounded-[14px] hover:bg-brand-primary/90 transition-colors shadow-sm">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
              Add new shipment
            </button>
          </div>
        </div>

        {/* MIDDLE ROW: Graphs Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* LEFT: Fulfillment Performance */}
          <div className="flex flex-col">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-base font-sans font-medium text-brand-primary">Fulfillment Performance</h3>
              <div className="flex gap-2">
                <button className="h-9 w-9 flex items-center justify-center rounded-[10px] bg-white border border-brand-border/40 shadow-sm text-brand-primary hover:bg-brand-surface">
                  <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </button>
                <button className="h-9 w-9 flex items-center justify-center rounded-[10px] bg-white border border-brand-border/40 shadow-sm text-brand-primary hover:bg-brand-surface">
                  <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="relative h-48 w-full flex items-end justify-between px-2">
              {/* Grid lines & labels */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                <div className="w-full flex justify-end"><span className="text-[10px] text-brand-neutral-dark/40 font-semibold transform -translate-y-1/2">100%</span></div>
                <div className="w-full border-t border-brand-border/50 border-dashed flex justify-end"><span className="text-[10px] text-brand-neutral-dark/40 font-semibold transform -translate-y-1/2 bg-[#F1F6F3] pl-2">50%</span></div>
                <div className="w-full border-t border-brand-border/50 flex justify-end"><span className="text-[10px] text-brand-neutral-dark/40 font-semibold transform -translate-y-1/2 bg-[#F1F6F3] pl-2">0%</span></div>
              </div>

              {/* Bars Mock */}
              {[40, 60, 45, 75, 45, 25, 95, 50, 65, 40, 20, 30, 45, 55, 90, 50, 40].map((h, i) => (
                <div key={i} className="relative flex flex-col items-center group w-4">
                  {i === 6 && (
                     <span className="absolute -top-7 text-[11px] font-bold text-brand-primary whitespace-nowrap">19 Sep</span>
                  )}
                  <div 
                    className={`w-full rounded-sm ${i === 6 ? 'bg-brand-primary' : 'bg-gradient-to-t from-brand-border/10 to-brand-border/80'}`} 
                    style={{ height: `${h}%` }}
                  >
                    {i !== 6 && <div className="h-0.5 w-full bg-brand-neutral-dark/60 rounded-t-sm" />}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Sales Overview */}
          <div className="flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-sans font-medium text-brand-primary">Sales Overview</h3>
              <div className="flex gap-2">
                <button className="h-9 w-9 flex items-center justify-center rounded-[10px] bg-white border border-brand-border/40 shadow-sm text-brand-primary hover:bg-brand-surface">
                  <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </button>
                <button className="h-9 w-9 flex items-center justify-center rounded-[10px] bg-white border border-brand-border/40 shadow-sm text-brand-primary hover:bg-brand-surface">
                  <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="flex items-end gap-3 mb-6">
              <span className="text-[40px] font-sans font-medium text-brand-primary tracking-tight leading-none">₹3,65,00,000</span>
              <span className="inline-flex items-center gap-0.5 mb-1.5 px-2 py-0.5 rounded-[6px] bg-white border border-brand-border/60 text-[10px] font-bold text-brand-neutral-dark/50 shadow-sm">
                32.2% 
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
                </svg>
              </span>
            </div>

            {/* Sankey / Stacked Chart Mock */}
            <div className="relative h-[110px] w-full flex items-end justify-between">
              
              {/* Column 1 */}
              <div className="flex flex-col gap-1 w-1/4 h-full justify-end relative z-10">
                <span className="text-[10px] font-bold text-brand-primary mb-1">₹1,30,00,000</span>
                <div className="h-3 bg-brand-neutral-dark/30 rounded-md w-full" />
                <div className="h-4 bg-brand-neutral-dark/50 rounded-md w-full" />
                <div className="h-7 bg-brand-neutral-dark/70 rounded-md w-full" />
                <div className="h-4 bg-brand-primary rounded-md w-full" />
              </div>

              {/* Connector Polygons 1 to 2 */}
              <div className="absolute left-[25%] w-[12.5%] h-full">
                <svg className="w-full h-full opacity-10" preserveAspectRatio="none">
                  <polygon points="0,45 100,65 100,110 0,110" fill="currentColor" />
                </svg>
              </div>

              {/* Column 2 */}
              <div className="flex flex-col gap-1 w-1/4 h-[80%] justify-end relative z-10">
                <span className="text-[10px] font-bold text-brand-primary mb-1 text-center">₹71,50,000</span>
                <div className="h-2 bg-brand-neutral-dark/30 rounded-md w-full" />
                <div className="h-3 bg-brand-neutral-dark/50 rounded-md w-full" />
                <div className="h-5 bg-brand-neutral-dark/70 rounded-md w-full" />
                <div className="h-3 bg-brand-primary rounded-md w-full" />
              </div>

              {/* Connector Polygons 2 to 3 */}
              <div className="absolute left-[62.5%] w-[12.5%] h-full">
                <svg className="w-full h-full opacity-10" preserveAspectRatio="none">
                  <polygon points="0,65 100,10 100,110 0,110" fill="currentColor" />
                </svg>
              </div>

              {/* Column 3 */}
              <div className="flex flex-col gap-1 w-1/4 h-[110%] justify-end relative z-10 transform translate-y-2">
                <span className="text-[10px] font-bold text-brand-primary mb-1 text-right">₹1,63,50,000</span>
                <div className="h-5 bg-brand-neutral-dark/30 rounded-md w-full" />
                <div className="h-5 bg-brand-neutral-dark/50 rounded-md w-full" />
                <div className="h-9 bg-brand-neutral-dark/70 rounded-md w-full" />
                <div className="h-6 bg-brand-primary rounded-md w-full" />
              </div>
            </div>

            {/* Legend */}
            <div className="flex justify-center items-center gap-4 mt-6 text-[10px] font-semibold text-brand-primary">
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-sm bg-brand-primary" />Maharashtra</div>
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-sm bg-brand-neutral-dark/70" />Delhi</div>
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-sm bg-brand-neutral-dark/50" />Karnataka</div>
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-sm bg-brand-neutral-dark/30" />Tamil Nadu</div>
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-sm bg-[#D1D5DB]" />Other</div>
            </div>
          </div>

        </div>
      </div>


      {/* -------------------------------------------------------------
          BOTTOM ORDERS SECTION
          ------------------------------------------------------------- */}
      <div className="w-full">
        {/* Table Header Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 px-2">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-sans font-medium text-brand-primary">Orders</h2>
            <span className="px-2.5 py-1 rounded-lg bg-white border border-brand-border/60 text-xs font-bold text-brand-neutral-dark/70 shadow-sm">
              264
            </span>
          </div>
          
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
            <button className="px-4 py-2 rounded-xl bg-white border border-brand-border/60 text-[13px] font-semibold text-brand-neutral-dark/80 shadow-sm whitespace-nowrap hover:bg-brand-surface">Pending 70</button>
            <button className="px-4 py-2 rounded-xl bg-white border border-brand-border/60 text-[13px] font-semibold text-brand-neutral-dark/80 shadow-sm whitespace-nowrap hover:bg-brand-surface">Responded 85</button>
            <button className="px-4 py-2 rounded-xl bg-brand-primary text-[13px] font-semibold text-white shadow-sm whitespace-nowrap hover:bg-brand-primary/90">Assigned 53</button>
            <button className="px-4 py-2 rounded-xl bg-white border border-brand-border/60 text-[13px] font-semibold text-brand-neutral-dark/80 shadow-sm whitespace-nowrap hover:bg-brand-surface">Completed 56</button>
            <button className="px-3 py-2 rounded-xl bg-white border border-brand-border/60 text-brand-primary shadow-sm hover:bg-brand-surface ml-1">
              <svg className="h-4 w-4 transform rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </button>
          </div>
        </div>

        {/* Custom List Rows matching the image */}
        <div className="flex flex-col gap-2">
          {/* List Header */}
          <div className="grid grid-cols-6 gap-4 px-6 py-2 text-[11px] font-semibold text-brand-neutral-dark/50">
            <div>Order ID</div>
            <div>Order assigned to</div>
            <div>Pickup address</div>
            <div>Delivery address</div>
            <div>Est. delivery</div>
            <div>Status</div>
          </div>
          
          {/* List Items */}
          {recentOrders.map((order, i) => (
            <div key={i} className="grid grid-cols-6 items-center gap-4 px-6 py-4 bg-white rounded-2xl shadow-sm border border-brand-border/30 hover:border-brand-border transition-colors">
              <div className="text-[13px] font-bold text-brand-primary">{order.id}</div>
              <div className="text-[13px] font-semibold text-brand-primary">{order.assignedTo}</div>
              <div className="text-[13px] font-semibold text-brand-primary flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-brand-surface border border-brand-border/60 overflow-hidden" /> {/* Flag placeholder */}
                {order.pickup}
              </div>
              <div className="text-[13px] font-semibold text-brand-primary flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-brand-surface border border-brand-border/60 overflow-hidden" /> {/* Flag placeholder */}
                {order.delivery}
              </div>
              <div className="text-[13px] font-semibold text-brand-primary">{order.estDelivery}</div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-1.5 h-1.5 rounded-full ${order.dotColor}`} />
                  <span className="text-[13px] font-semibold text-brand-primary">{order.status}</span>
                </div>
                <div className="flex gap-1.5">
                  <button className="px-3 py-1.5 rounded-lg bg-white border border-brand-border/60 text-[11px] font-semibold text-brand-primary hover:bg-brand-surface shadow-sm">See more</button>
                  <button className="px-2 py-1.5 rounded-lg bg-white border border-brand-border/60 text-brand-primary hover:bg-brand-surface shadow-sm flex items-center justify-center">
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
