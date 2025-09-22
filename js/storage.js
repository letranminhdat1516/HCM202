function getCommitments() {
  try {
    return JSON.parse(localStorage.getItem('hcm202_commitments') || '[]');
  } catch {
    return [];
  }
}

function addCommitment(item) {
  const newCommitment = {
    ...item, 
    id: Date.now(), 
    createdAt: new Date().toISOString()
  };

  try {
    const current = getCommitments();
    const updated = [newCommitment, ...current].slice(0, 100);
    localStorage.setItem('hcm202_commitments', JSON.stringify(updated));
    return true;
  } catch {
    return false;
  }
}

window.StorageManager = {
  getCommitments,
  addCommitment
};
