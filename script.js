// Global state management
let appData = {
    currentMonth: 'September 2025',
    members: [
        { name: 'Ismail', paid: true },
        { name: 'Basil', paid: true }
    ],
    bills: [
        { 
            id: 1, 
            amount: 7, 
            description: 'Grocery Shopping', 
            date: new Date().toLocaleDateString(),
            month: 'September 2025'
        }
    ],
    history: [],
    monthlyPayment: 5
};

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    loadData();
    initializeWelcomeScreen();
    initializeNavigation();
    initializeAdminPanel();
    updateDashboard();
    updateAdminPanel();
    updateHistory();
});

// Welcome screen animation
function initializeWelcomeScreen() {
    const welcomeScreen = document.getElementById('welcome-screen');
    const mainApp = document.getElementById('main-app');
    
    setTimeout(() => {
        welcomeScreen.style.display = 'none';
        mainApp.classList.remove('hidden');
    }, 5000);
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

// Admin panel functionality
function initializeAdminPanel() {
    // Add member functionality
    const addMemberBtn = document.getElementById('add-member-btn');
    const newMemberInput = document.getElementById('new-member-name');
    
    addMemberBtn.addEventListener('click', () => {
        const memberName = newMemberInput.value.trim();
        if (memberName) {
            appData.members.push({ name: memberName, paid: false });
            newMemberInput.value = '';
            saveData();
            updateDashboard();
            updateAdminPanel();
        }
    });
    
    newMemberInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addMemberBtn.click();
        }
    });
    
    // Add bill functionality
    const addBillBtn = document.getElementById('add-bill-btn');
    const billAmountInput = document.getElementById('bill-amount');
    const billDescriptionInput = document.getElementById('bill-description');
    
    addBillBtn.addEventListener('click', () => {
        const amount = parseFloat(billAmountInput.value);
        const description = billDescriptionInput.value.trim();
        
        if (amount > 0 && description) {
            const newBill = {
                id: Date.now(),
                amount: amount,
                description: description,
                date: new Date().toLocaleDateString(),
                month: appData.currentMonth
            };
            
            appData.bills.push(newBill);
            billAmountInput.value = '';
            billDescriptionInput.value = '';
            saveData();
            updateDashboard();
            updateAdminPanel();
        }
    });
    
    billAmountInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            billDescriptionInput.focus();
        }
    });
    
    billDescriptionInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addBillBtn.click();
        }
    });
    
    // Next month functionality
    const nextMonthBtn = document.getElementById('next-month-btn');
    nextMonthBtn.addEventListener('click', () => {
        moveToNextMonth();
    });
}

// Update dashboard
function updateDashboard() {
    updateSummaryCards();
    updateMembersGrid();
    updateBillsList();
    updateCurrentMonth();
}

function updateSummaryCards() {
    const totalCollected = appData.members.filter(m => m.paid).length * appData.monthlyPayment;
    const currentMonthBills = appData.bills.filter(bill => bill.month === appData.currentMonth);
    const totalSpent = currentMonthBills.reduce((sum, bill) => sum + bill.amount, 0);
    const remaining = totalCollected - totalSpent;
    
    document.getElementById('total-collected').textContent = `${totalCollected} OMR`;
    document.getElementById('total-spent').textContent = `${totalSpent.toFixed(2)} OMR`;
    document.getElementById('remaining').textContent = `${remaining.toFixed(2)} OMR`;
}

function updateMembersGrid() {
    const membersGrid = document.getElementById('members-grid');
    membersGrid.innerHTML = '';
    
    appData.members.forEach(member => {
        const memberCard = document.createElement('div');
        memberCard.className = `member-card ${member.paid ? 'paid' : 'unpaid'}`;
        
        memberCard.innerHTML = `
            <div class="member-name">${member.name}</div>
            <div class="payment-status">${member.paid ? '✅' : '❌'}</div>
            <div class="payment-amount">${member.paid ? `${appData.monthlyPayment} OMR` : 'Not Paid'}</div>
        `;
        
        membersGrid.appendChild(memberCard);
    });
}

function updateBillsList() {
    const billsList = document.getElementById('bills-list');
    billsList.innerHTML = '';
    
    const currentMonthBills = appData.bills
        .filter(bill => bill.month === appData.currentMonth)
        .sort((a, b) => new Date(b.date) - new Date(a.date));
    
    if (currentMonthBills.length === 0) {
        billsList.innerHTML = '<p style="text-align: center; color: #666; padding: 2rem;">No bills added yet</p>';
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

function updateCurrentMonth() {
    document.getElementById('current-month').textContent = appData.currentMonth;
}

// Update admin panel
function updateAdminPanel() {
    updatePaymentManagement();
    updateAdminBillsList();
}

function updatePaymentManagement() {
    const paymentManagement = document.getElementById('payment-management');
    paymentManagement.innerHTML = '';
    
    appData.members.forEach((member, index) => {
        const paymentControl = document.createElement('div');
        paymentControl.className = 'payment-control';
        
        paymentControl.innerHTML = `
            <div>
                <div style="font-weight: 600;">${member.name}</div>
                <div style="font-size: 0.9rem; color: #666;">${appData.monthlyPayment} OMR</div>
            </div>
            <button class="payment-toggle ${member.paid ? 'paid' : ''}" data-index="${index}">
                ${member.paid ? 'Paid ✅' : 'Not Paid ❌'}
            </button>
        `;
        
        paymentManagement.appendChild(paymentControl);
    });
    
    // Add event listeners for payment toggles
    document.querySelectorAll('.payment-toggle').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = parseInt(e.target.dataset.index);
            appData.members[index].paid = !appData.members[index].paid;
            saveData();
            updateDashboard();
            updateAdminPanel();
        });
    });
}

function updateAdminBillsList() {
    const adminBillsList = document.getElementById('admin-bills-list');
    adminBillsList.innerHTML = '';
    
    const currentMonthBills = appData.bills
        .filter(bill => bill.month === appData.currentMonth)
        .sort((a, b) => new Date(b.date) - new Date(a.date));
    
    if (currentMonthBills.length === 0) {
        adminBillsList.innerHTML = '<p style="text-align: center; color: #666; padding: 2rem;">No bills added yet</p>';
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
            <div style="display: flex; align-items: center; gap: 10px;">
                <div class="bill-amount">${bill.amount.toFixed(2)} OMR</div>
                <button class="delete-btn" data-bill-id="${bill.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        
        adminBillsList.appendChild(billItem);
    });
    
    // Add event listeners for delete buttons
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const billId = parseInt(e.target.closest('.delete-btn').dataset.billId);
            appData.bills = appData.bills.filter(bill => bill.id !== billId);
            saveData();
            updateDashboard();
            updateAdminPanel();
        });
    });
}

// Move to next month
function moveToNextMonth() {
    // Save current month to history
    const currentMonthData = {
        month: appData.currentMonth,
        members: [...appData.members],
        bills: appData.bills.filter(bill => bill.month === appData.currentMonth),
        totalCollected: appData.members.filter(m => m.paid).length * appData.monthlyPayment,
        totalSpent: appData.bills
            .filter(bill => bill.month === appData.currentMonth)
            .reduce((sum, bill) => sum + bill.amount, 0)
    };
    
    appData.history.unshift(currentMonthData);
    
    // Move to next month
    const currentDate = new Date();
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    // Get next month
    const currentMonthIndex = monthNames.findIndex(month => 
        appData.currentMonth.includes(month)
    );
    const currentYear = parseInt(appData.currentMonth.split(' ')[1]);
    
    let nextMonthIndex = currentMonthIndex + 1;
    let nextYear = currentYear;
    
    if (nextMonthIndex >= 12) {
        nextMonthIndex = 0;
        nextYear++;
    }
    
    appData.currentMonth = `${monthNames[nextMonthIndex]} ${nextYear}`;
    
    // Reset payment status for all members
    appData.members.forEach(member => {
        member.paid = false;
    });
    
    saveData();
    updateDashboard();
    updateAdminPanel();
    updateHistory();
    
    // Show confirmation
    alert(`Moved to ${appData.currentMonth}. All payment statuses have been reset.`);
}

// Update history
function updateHistory() {
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = '';
    
    if (appData.history.length === 0) {
        historyList.innerHTML = '<p style="text-align: center; color: #666; padding: 2rem;">No history available yet</p>';
        return;
    }
    
    appData.history.forEach(monthData => {
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

// Data persistence
function saveData() {
    localStorage.setItem('cdcDukkanData', JSON.stringify(appData));
}

function loadData() {
    const savedData = localStorage.getItem('cdcDukkanData');
    if (savedData) {
        const parsedData = JSON.parse(savedData);
        // Merge with default data to ensure all properties exist
        appData = { ...appData, ...parsedData };
    }
}

// Utility functions
function formatCurrency(amount) {
    return `${amount.toFixed(2)} OMR`;
}

function getCurrentDate() {
    return new Date().toLocaleDateString();
}

// Export functions for potential future use
window.cdcDukkan = {
    appData,
    saveData,
    loadData,
    updateDashboard,
    updateAdminPanel,
    updateHistory,
    moveToNextMonth
};

