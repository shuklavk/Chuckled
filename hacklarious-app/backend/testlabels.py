
from google.cloud import vision

def detect_labels_uri(uri):
    """Detects labels in the file located in Google Cloud Storage or on the
    Web."""
    
    client = vision.ImageAnnotatorClient.from_service_account_json('gc.json')
    image = vision.types.Image()
    image.source.image_uri = uri

    response = client.label_detection(image=image)
    labels = response.label_annotations
    print('Labels:')

    keywords = []
    for label in labels:
        print(label.description)
        keywords.append(label.description)


    if response.error.message:
        raise Exception(
            '{}\nFor more info on error messages, check: '
            'https://cloud.google.com/apis/design/errors'.format(
                response.error.message))
    return keywords



imageurl = "https://storage.googleapis.com/hacklarious/testimage.jpg"

labels = detect_labels_uri(imageurl)

if len(labels) == 0:
    print ("empty - no labels detected")
else:
    i = 0
    for l in labels:
        print (l)
        i = i + 1
        if i == 3: 
            break




