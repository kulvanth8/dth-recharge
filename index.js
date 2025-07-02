// Handle recharge data in localStorage
const form = document.getElementById('rechargeForm');
const rechargeList = document.getElementById('rechargeList');
const clearBtn = document.getElementById('clearAll');

// Fetch existing data
function getRecharges() {
    return JSON.parse(localStorage.getItem('recharges') || '[]');
}

// Save data
function saveRecharges(data) {
    localStorage.setItem('recharges', JSON.stringify(data));
}

// Render recharge table
function renderTable() {
    const recharges = getRecharges();
    rechargeList.innerHTML = '';
    if (recharges.length === 0) {
        rechargeList.innerHTML = `<tr><td colspan="5" style="color:#888">No recharge records found.</td></tr>`;
        return;
    }
    recharges.forEach((r, idx) => {
        rechargeList.innerHTML += `
            <tr>
                <td>${r.mobile}</td>
                <td>${r.operator}</td>
                <td>₹${r.amount}</td>
                <td>${r.date}</td>
                <td>
                    <button class="action-btn" onclick="deleteRecharge(${idx})">Delete</button>
                </td>
            </tr>
        `;
    });
}

// Add recharge
form.addEventListener('submit', function(e) {
    e.preventDefault();
    const mobile = form.mobile.value.trim();
    const operator = form.operator.value.trim();
    const amount = form.amount.value.trim();
    const date = form.date.value;

    if (!/^\d{10}$/.test(mobile)) {
        alert('Please enter a valid 10-digit mobile number.');
        form.mobile.focus();
        return;
    }
    const recharge = { mobile, operator, amount, date };
    const recharges = getRecharges();
    recharges.push(recharge);
    saveRecharges(recharges);
    renderTable();
    form.reset();
});

// Delete recharge
window.deleteRecharge = function(idx) {
    if (confirm('Delete this recharge entry?')) {
        const recharges = getRecharges();
        recharges.splice(idx, 1);
        saveRecharges(recharges);
        renderTable();
    }
};

// Clear all
clearBtn.addEventListener('click', function() {
    if (confirm('Are you sure you want to clear all recharge records?')) {
        saveRecharges([]);
        renderTable();
    }
});

// On load
renderTable();
