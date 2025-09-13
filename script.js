// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeWelcomeScreen();
    initializeNavigation();
    updateDashboard();
    updateHistory();
});

// Welcome screen animation with improved timing
function initializeWelcomeScreen() {
    const welcomeScreen = document.getElementById('welcome-screen');
    const mainApp = document.getElementById('main-app');
    
    // Hide welcome screen after 5 seconds with fade effect
    setTimeout(() => {
        welcomeScreen.classList.add('fade-out');
        
        // Wait for fade animation to complete, then show main app
        setTimeout(() => {
            welcomeScreen.style.display = 'none';
            mainApp.classList.remove('hidden');
            mainApp.classList.add('visible');
        }, 1000); // Wait for 1s fade transition
    }, 4000); // Show welcome for 4 seconds
}

// Navigation functionality
function initializeNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.section');
    
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.id.replace('-btn', '');
            
            // Update active nav button
            navButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Update active section
            sections.forEach(section => section.classList.remove('active'));
            document.getElementById(targetId).classList.add('active');
        });
    });
}

// Update dashboard with current data
function updateDashboard() {
    updateCurrentMonth();
    updateSummaryCards();
    updateMembersGrid();
    updateBillsList();
}

function updateCurrentMonth() {
    const currentMonthElement = document.getElementById('current-month');
    if (currentMonthElement && window.cdcData) {
        currentMonthElement.textContent = window.cdcData.currentMonth;
    }
}

function updateSummaryCards() {
    if (!window.cdcData) return;
    
    const totalCollected = window.cdcData.members.filter(m => m.paid).length * window.cdcData.monthlyPayment;
    const currentMonthBills = window.cdcData.bills.filter(bill => bill.month === window.cdcData.currentMonth);
    const totalSpent = currentMonthBills.reduce((sum, bill) => sum + bill.amount, 0);
    const remaining = totalCollected - totalSpent;
    
    const totalCollectedElement = document.getElementById('total-collected');
    const totalSpentElement = document.getElementById('total-spent');
    const remainingElement = document.getElementById('remaining');
    
    if (totalCollectedElement) totalCollectedElement.textContent = `${totalCollected} OMR`;
    if (totalSpentElement) totalSpentElement.textContent = `${totalSpent.toFixed(2)} OMR`;
    if (remainingElement) remainingElement.textContent = `${remaining.toFixed(2)} OMR`;
}

function updateMembersGrid() {
    const membersGrid = document.getElementById('members-grid');
    if (!membersGrid || !window.cdcData) return;
    
    membersGrid.innerHTML = '';
    
    window.cdcData.members.forEach(member => {
        const memberCard = document.createElement('div');
        memberCard.className = `member-card ${member.paid ? 'paid' : 'unpaid'}`;
        
        memberCard.innerHTML = `
            <div class="member-name">${member.name}</div>
            <div class="payment-status">${member.paid ? '✅' : '❌'}</div>
            <div class="payment-amount">${member.paid ? `${window.cdcData.monthlyPayment} OMR` : 'Not Paid'}</div>
        `;
        
        membersGrid.appendChild(memberCard);
    });
}

function updateBillsList() {
    const billsList = document.getElementById('bills-list');
    if (!billsList || !window.cdcData) return;
    
    billsList.innerHTML = '';
    
    const currentMonthBills = window.cdcData.bills
        .filter(bill => bill.month === window.cdcData.currentMonth)
        .sort((a, b) => new Date(b.date) - new Date(a.date));
    
    if (currentMonthBills.length === 0) {
        billsList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-receipt"></i>
                <p>No bills added yet for this month</p>
            </div>
        `;
        return;
    }
    
    currentMonthBills.forEach(bill => {
        const billItem = document.createElement('div');
        billItem.className = 'bill-item';
        
        billItem.innerHTML = `
            <div>
                <div class="bill-description">${bill.description}</div>
                <div class="bill-date">${bill.date}</div>
            </div>
            <div class="bill-amount">${bill.amount.toFixed(2)} OMR</div>
        `;
        
        billsList.appendChild(billItem);
    });
}

// Update history section
function updateHistory() {
    const historyList = document.getElementById('history-list');
    if (!historyList || !window.cdcData) return;
    
    historyList.innerHTML = '';
    
    if (window.cdcData.history.length === 0) {
        historyList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-history"></i>
                <p>No history available yet</p>
            </div>
        `;
        return;
    }
    
    window.cdcData.history.forEach(monthData => {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        
        const remaining = monthData.totalCollected - monthData.totalSpent;
        
        historyItem.innerHTML = `
            <div class="history-header">
                <div class="history-month">${monthData.month}</div>
            </div>
            <div class="history-summary">
                <div class="history-stat">
                    <div class="history-stat-label">Collected</div>
                    <div class="history-stat-value">${monthData.totalCollected} OMR</div>
                </div>
                <div class="history-stat">
                    <div class="history-stat-label">Spent</div>
                    <div class="history-stat-value">${monthData.totalSpent.toFixed(2)} OMR</div>
                </div>
                <div class="history-stat">
                    <div class="history-stat-label">Remaining</div>
                    <div class="history-stat-value">${remaining.toFixed(2)} OMR</div>
                </div>
                <div class="history-stat">
                    <div class="history-stat-label">Bills</div>
                    <div class="history-stat-value">${monthData.bills.length}</div>
                </div>
            </div>
            <div class="history-members">
                <h4>Payment Status:</h4>
                <div class="history-member-list">
                    ${monthData.members.map(member => 
                        `<span class="history-member ${member.paid ? 'paid' : ''}">${member.name} ${member.paid ? '✅' : '❌'}</span>`
                    ).join('')}
                </div>
            </div>
            ${monthData.bills.length > 0 ? `
                <div class="history-bills">
                    <h4>Bills:</h4>
                    <div class="bills-list">
                        ${monthData.bills.map(bill => `
                            <div class="bill-item">
                                <div>
                                    <div class="bill-description">${bill.description}</div>
                                    <div class="bill-date">${bill.date}</div>
                                </div>
                                <div class="bill-amount">${bill.amount.toFixed(2)} OMR</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}
        `;
        
        historyList.appendChild(historyItem);
    });
}

// Utility functions
function formatCurrency(amount) {
    return `${amount.toFixed(2)} OMR`;
}

function getCurrentDate() {
    return new Date().toLocaleDateString();
}

// Refresh data when admin.js is updated
function refreshData() {
    updateDashboard();
    updateHistory();
}

// Export functions for potential future use
window.cdcDukkan = {
    refreshData,
    updateDashboard,
    updateHistory
};

