const logger = require("firebase-functions/logger");

const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const { initializeApp } = require("firebase-admin/app");
const { getFirestore, FieldValue } = require("firebase-admin/firestore");

initializeApp();
const db = getFirestore();

exports.onReviewCreated = onDocumentCreated(
    "reviews/{docId}", 
    async (event) => {
        const snapshot = event.data;

        const review = snapshot.data();

        const { rating, dormID } = review;

        if (!rating || !dormID) {
            return;
        }

        const dormRef = db.collection("dorms").doc(dormID);

        try {
            return db.runTransaction( async (t) => {
                const dormDoc = await t.get(dormRef);
                const dormData = dormDoc.data();

                // Calculate new Averate Rating
                const currentRating = dormData.rating || 0;
                const currentNumReviews = dormData.numReviews || 0;
                const newNumReviews = currentNumReviews + 1;

                const newAverageRating = (currentRating * currentNumReviews + rating) / newNumReviews;

                return t.update(dormRef, {
                    rating: newAverageRating,
                    numReviews: FieldValue.increment(1)
                });
            });
        } catch (e) {
            logger.error("Transaction Error");
        }
    }
);
