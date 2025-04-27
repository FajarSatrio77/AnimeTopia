import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "~/firebase/init";

/**
 * Check if a user has premium status
 * @param {string} uid - User ID
 * @returns {Promise<boolean>} Premium status
 */
export async function checkPremiumStatus(uid) {
  try {
    if (!uid) return false;
    
    const userDoc = await getDoc(doc(db, "users", uid));
    if (!userDoc.exists()) return false;
    
    const userData = userDoc.data();
    return userData.isPremium || false;
  } catch (error) {
    console.error("Error checking premium status:", error);
    return false;
  }
}

/**
 * Activate premium subscription for a user
 * @param {string} uid - User ID
 * @returns {Promise<boolean>} Success status
 */
export async function activatePremium(uid) {
  try {
    if (!uid) throw new Error("User ID required");
    
    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, {
      isPremium: true,
      premiumActivatedAt: new Date(),
      subscriptionStatus: 'active'
    });
    
    return true;
  } catch (error) {
    console.error("Error activating premium:", error);
    return false;
  }
}

/**
 * Deactivate premium subscription for a user
 * @param {string} uid - User ID
 * @returns {Promise<boolean>} Success status
 */
export async function deactivatePremium(uid) {
  try {
    if (!uid) throw new Error("User ID required");
    
    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, {
      isPremium: false,
      premiumDeactivatedAt: new Date(),
      subscriptionStatus: 'inactive'
    });
    
    return true;
  } catch (error) {
    console.error("Error deactivating premium:", error);
    return false;
  }
}

/**
 * Get user's subscription details
 * @param {string} uid - User ID
 * @returns {Promise<Object>} Subscription details
 */
export async function getSubscriptionDetails(uid) {
  try {
    if (!uid) throw new Error("User ID required");
    
    const userDoc = await getDoc(doc(db, "users", uid));
    if (!userDoc.exists()) throw new Error("User not found");
    
    const userData = userDoc.data();
    return {
      isPremium: userData.isPremium || false,
      status: userData.subscriptionStatus || 'inactive',
      activatedAt: userData.premiumActivatedAt || null,
      deactivatedAt: userData.premiumDeactivatedAt || null
    };
  } catch (error) {
    console.error("Error getting subscription details:", error);
    return null;
  }
} 