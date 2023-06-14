package io.agora.rtc.base

import android.util.Base64
import androidx.annotation.IntRange
import io.agora.rtc.IMetadataObserver
import java.util.Collections
import java.util.concurrent.atomic.AtomicInteger

class MediaObserver(
  private val emit: (data: Map<String, Any?>?) -> Unit
) : IMetadataObserver {
  private var maxMetadataSize = AtomicInteger(1024)
  private var metadataList = Collections.synchronizedList<ByteArray>(mutableListOf())

  fun addMetadata(metadata: ByteArray) {
    metadataList.add(metadata)
  }

  fun setMaxMetadataSize(@IntRange(from = 0, to = 1024) size: Int) {
    maxMetadataSize.set(size)
  }

  override fun onReadyToSendMetadata(timeStampMs: Long): ByteArray? {
    if (metadataList.size > 0) {
      return metadataList.removeAt(0)
    }
    return null
  }

  override fun getMaxMetadataSize(): Int {
    return maxMetadataSize.get()
  }

  override fun onMetadataReceived(buffer: ByteArray, uid: Int, timeStampMs: Long) {
    emit(
      hashMapOf(
        "data" to arrayListOf(
          Base64.encodeToString(buffer, Base64.DEFAULT), uid.toUInt().toLong(), timeStampMs
        )
      )
    )
  }
}
