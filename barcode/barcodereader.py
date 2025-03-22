import cv2
from pyzbar import pyzbar

def scan_barcodes():
    cap = cv2.VideoCapture(0)  # Open the webcam

    print("Press 'q' to quit.")

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        # Detect barcodes and QR codes
        decoded_objects = pyzbar.decode(frame)

        for obj in decoded_objects:
            # Draw rectangle around detected code
            (x, y, w, h) = obj.rect
            cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)

            # Display type and data
            barcode_type = obj.type
            barcode_data = obj.data.decode("utf-8")
            text = f"{barcode_type}: {barcode_data}"
            cv2.putText(frame, text, (x, y - 10),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 0, 0), 2)

            print(f"Scanned {barcode_type}: {barcode_data}")

            # ✅ Return barcode data if it's EAN13
            if barcode_type == "EAN13":
                cap.release()
                cv2.destroyAllWindows()
                return barcode_data

        cv2.imshow("Barcode Scanner", frame)

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()
    return None

if __name__ == "__main__":
    result = scan_barcodes()
    if result:
        print("Returned EAN13:", result)

