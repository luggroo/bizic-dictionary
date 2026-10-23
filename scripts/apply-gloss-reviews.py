"""Apply reviewed Chinese glosses to the published dictionary, retaining provenance."""
import json
import pathlib
import sys


def apply_reviews(data, reviews):
    words = {word['id']: word for word in data['words']}
    missing = set(reviews) - set(words)
    if missing:
        raise ValueError(f'Review refers to missing entries: {sorted(missing)}')
    for word_id, review in reviews.items():
        word = words[word_id]
        if word['term'] != review['term'] or word.get('enBeforeReview', word.get('en', '')) != review['en']:
            raise ValueError(f'Review identity mismatch: {word_id}')
        if review.get('dialect'):
            word.setdefault('dialectBeforeReview', word.get('dialect', ''))
            word['dialect'] = review['dialect']
            word['dialects'] = [review['dialect']]
            word['location'] = review['location']
            word['locations'] = [review['location']]
            word['notice'] = '方言及地点见词条来源说明。'
            for attestation in word.get('attestations', []):
                attestation.setdefault('dialectBeforeReview', attestation.get('dialect', ''))
                attestation['dialect'] = review['dialect']
                attestation['location'] = review['location']
                attestation['notice'] = '方言及地点见词条来源说明。'
        word.setdefault('zhBeforeReview', word.get('zh', ''))
        word['zh'] = review['zh']
        word['zhVariants'] = [review['zh']]
        word['zhReviewStatus'] = review['status']
        if review.get('reviewEvidence'):
            word['zhReviewEvidence'] = review['reviewEvidence']
            word['zhReviewedAt'] = review.get('reviewedAt', '')
        if review.get('correctedEn'):
            word.setdefault('enBeforeReview', word.get('en', ''))
            word.setdefault('glossesBeforeReview', word.get('glosses', []))
            word['en'] = review['correctedEn']
            word['glosses'] = [review['correctedEn']]
        elif review.get('enNote'):
            word.setdefault('enBeforeReview', word.get('en', ''))
            word.setdefault('glossesBeforeReview', word.get('glosses', []))
            word['en'] = word['enBeforeReview'] + ' (' + review['enNote'] + ')'
            word['glosses'] = [word['en']]
        for attestation in word.get('attestations', []):
            attestation.setdefault('zhBeforeReview', attestation.get('zh', ''))
            attestation['zh'] = review['zh']
            attestation['zhReviewStatus'] = review['status']
            if review.get('reviewEvidence'):
                attestation['zhReviewEvidence'] = review['reviewEvidence']
            if review.get('correctedEn'):
                # Restore any old display annotation; retain the source English.
                if 'enBeforeReview' in attestation:
                    attestation['en'] = attestation['enBeforeReview']
            elif review.get('enNote'):
                attestation.setdefault('enBeforeReview', attestation.get('en', ''))
                attestation['en'] = attestation['enBeforeReview'] + ' (' + review['enNote'] + ')'
    return data


if __name__ == '__main__':
    site = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else 'site')
    path = site / 'dictionary.json'
    reviews = json.loads((site / 'gloss-reviews.json').read_text())['entries']
    data = apply_reviews(json.loads(path.read_text()), reviews)
    path.write_text(json.dumps(data, ensure_ascii=False, separators=(',', ':')))
    print(f'Applied {len(reviews)} Chinese gloss reviews')
