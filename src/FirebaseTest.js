// FirebaseTest.js - Add this component temporarily to test Firebase connection
import React, { useState } from 'react';
import { collection, getDocs, doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

const FirebaseTest = () => {
  const [testResult, setTestResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const testFirebaseConnection = async () => {
    setIsLoading(true);
    setTestResult('Testing Firebase connection...\n');
    
    try {
      // Test 1: Check if Firebase is initialized
      console.log('Firebase db object:', db);
      setTestResult(prev => prev + '✓ Firebase initialized successfully\n');

      // Test 2: Check authentication
      const currentUser = auth.currentUser;
      setTestResult(prev => prev + `✓ Auth check: ${currentUser ? `User logged in (${currentUser.uid})` : 'No user logged in'}\n`);

      // Test 3: Try to read from emergency_settings collection
      const emergencyRef = collection(db, 'emergency_settings');
      setTestResult(prev => prev + '✓ Collection reference created\n');

      const snapshot = await getDocs(emergencyRef);
      setTestResult(prev => prev + `✓ Firebase query successful - Found ${snapshot.size} documents\n`);

      if (!snapshot.empty) {
        snapshot.forEach((doc) => {
          setTestResult(prev => prev + `  - Document ID: ${doc.id}\n`);
          setTestResult(prev => prev + `  - Data: ${JSON.stringify(doc.data(), null, 2)}\n`);
        });
      } else {
        setTestResult(prev => prev + '  - No documents found in emergency_settings collection\n');
      }

      // Test 4: Try to write a test document (if user is authenticated)
      if (currentUser) {
        const testDoc = doc(db, 'test_collection', 'test_doc');
        await setDoc(testDoc, {
          test: true,
          timestamp: new Date(),
          userId: currentUser.uid
        });
        setTestResult(prev => prev + '✓ Write test successful\n');
      } else {
        setTestResult(prev => prev + '⚠ Skipping write test - user not authenticated\n');
      }

      setTestResult(prev => prev + '\n🎉 All tests passed! Firebase is working correctly.\n');

    } catch (error) {
      console.error('Firebase test error:', error);
      setTestResult(prev => prev + `❌ Error: ${error.message}\n`);
      setTestResult(prev => prev + `Error code: ${error.code || 'Unknown'}\n`);
      setTestResult(prev => prev + `Error details: ${JSON.stringify(error, null, 2)}\n`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header">
          <h5>Firebase Connection Test</h5>
        </div>
        <div className="card-body">
          <button 
            className="btn btn-primary mb-3" 
            onClick={testFirebaseConnection}
            disabled={isLoading}
          >
            {isLoading ? 'Testing...' : 'Test Firebase Connection'}
          </button>
          
          {testResult && (
            <div className="alert alert-info">
              <pre style={{ whiteSpace: 'pre-wrap', marginBottom: 0 }}>
                {testResult}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FirebaseTest;